/* eslint-disable prefer-const */
import { prisma } from '$lib/server/prisma';
import { json } from '@sveltejs/kit';
import { mapSantasToRecipients } from '$lib/utils/mapSantasToRecipients';

export const POST = async () => {
	try {
		// verify assignment has not already been done
		const mostRecentExchange = await prisma.exchange.findFirst({
			select: { year: true },
			orderBy: { year: 'desc' }
		});

		const currentYear = new Date().getUTCFullYear();

		if (mostRecentExchange.year === currentYear) {
			return json({ error: 'Santas have already been assigned' }, { status: 409 });
		}

		// create map for this year
		const users = await prisma.user.findMany({
			select: { id: true }
		});

		let lastYearMap = await generateLastYearMap(currentYear - 1);
		let santaToRecipientMap: Map<number, number> = new Map();

		while (santaToRecipientMap.size === 0) {
			santaToRecipientMap = mapSantasToRecipients(
				users.filter((user) => user.id != 1).map((user) => user.id),
				lastYearMap
			);
		}

		if (santaToRecipientMap.size != users.length - 1) {
			return json(
				{ error: 'There was a problem processing the data to assign Santas. Please try again.' },
				{ status: 404 }
			);
		}

		// create exchange records
		const exchanges = Array.from(santaToRecipientMap.entries()).map(([key, value]) => ({
			year: currentYear,
			present: '',
			santaId: key,
			recipientId: value
		}));

		await prisma.exchange.createMany({
			data: exchanges
		});

		return json({ success: true }, { status: 307 });
	} catch (err) {
		if (err.message) {
			return json({ error: 'Internal server error: ' + err.message }, { status: 501 });
		}
		return json({ error: 'Internal server error: ' + err }, { status: 501 });
	}
};

async function generateLastYearMap(lastYear: number) {
	let lastYearMap = new Map<number, number>();
	const lastExchanges = await prisma.exchange.findMany({
		select: { santaId: true, recipientId: true },
		where: { year: lastYear }
	});

	lastExchanges.forEach((exchange) => {
		lastYearMap.set(exchange.santaId, exchange.recipientId);
	});

	return lastYearMap;
}

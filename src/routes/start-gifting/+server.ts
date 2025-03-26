/* eslint-disable prefer-const */
import { prisma } from '$lib/server/prisma';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { mapSantasToRecipients } from '$lib/utils/assignSantas';

export const POST: RequestHandler = async () => {
	try {
		// verify assignment has not already been done
		const latestExchange = await prisma.exchange.findFirst({
			select: { year: true },
			orderBy: { year: 'desc' }
		});

		if (latestExchange === null) {
			// STODO: standardize
			throw new Error('Database should contain at least one exchange');
		}

		const currentYear = new Date().getUTCFullYear();

		if (latestExchange.year === currentYear) {
			return json({ error: 'Santas have already been assigned' }, { status: 409 });
		}

		// create map for this year
		const users = await prisma.user.findMany({
			select: { id: true }
		});

		let lastYearMap = await generateLastYearMap();
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

		let exchanges = [];
		let chats = [];

		// create exchange records
		for (const entry of Array.from(santaToRecipientMap.entries())) {
			const [key, value] = entry;

			exchanges.push({
				year: currentYear,
				present: '',
				santaId: key,
				recipientId: value
			})

			chats.push({
				santaId: key,
				recipientId: value
			});
		}

		await prisma.exchange.createMany({
			data: exchanges
		});

		await prisma.chat.createMany({
			data: chats
		});

		return json({ success: true, data: exchanges }, { status: 307 });
	} catch (err: any) {
		if (err satisfies Error) {
			return json({ error: 'Internal server error: ' + JSON.stringify(err.message) }, { status: 501 });
		}
		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { idsToDelete } = await request.json();

	try {
		if (idsToDelete) {
			await prisma.exchange.deleteMany({
				where: {
					id: {
						in: idsToDelete
					}
				}
			});

			await prisma.chat.deleteMany({});
		}

		return json({ success: true }, { status: 307 });
	} catch (err: any) {
		if (err satisfies Error) {
			return json({ error: 'Internal server error: ' + JSON.stringify(err.message) }, { status: 501 });
		}
		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};

async function generateLastYearMap() {
	let lastYearMap = new Map<number, number>();
	const lastExchanges = await prisma.exchange.findMany({
		select: { santaId: true, recipientId: true },
		where: { year: new Date().getUTCFullYear() - 1 }
	});

	lastExchanges.forEach((exchange) => {
		lastYearMap.set(exchange.santaId, exchange.recipientId);
	});

	return lastYearMap;
}

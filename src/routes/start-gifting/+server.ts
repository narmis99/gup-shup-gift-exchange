/* eslint-disable prefer-const */
import { prisma } from '$lib/server/prisma';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { mapSantasToRecipients } from '$lib/utils/assignSantas';
import type { User } from '@prisma/client';

export const POST: RequestHandler = async ({ request }) => {
	const { replaceExchange } = await request.json();

	try {
		const currentYear = new Date().getUTCFullYear();

		if (replaceExchange) {
			await prisma.exchange.deleteMany({
				where: {
					year: currentYear,
				},
			})
			await prisma.chat.deleteMany({});
		}

		// create map for this year
		const users = await prisma.user.findMany({ select: { id: true, username: true }, where: { NOT: { id: 1 } } });

		const lastYearMap = await generateLastYearMap();
		let santaToRecipientMap: Map<number, number> = new Map();

		while (santaToRecipientMap.size === 0) {
			santaToRecipientMap = mapSantasToRecipients(
				users.map((user) => user.id),
				lastYearMap
			);
		}

		if (santaToRecipientMap.size != users.length) {
			return json(
				{ error: 'There was a problem processing the data to assign Santas. Please try again.' },
				{ status: 404 }
			);
		}

		let exchanges = [];
		let chats = [];

		// create exchange records
		for (const [santaId, recipientId] of santaToRecipientMap) {
			exchanges.push({
				year: currentYear,
				present: '',
				santaId: santaId,
				recipientId: recipientId
			})

			chats.push({
				santaId: santaId,
				recipientId: recipientId
			});
		}

		await prisma.exchange.createMany({ data: exchanges });
		await prisma.chat.createMany({ data: chats });

		// generate user id to name map
		const userIdToNameMap = await generateUserIdToNameMap(users);


		// construct exchanges with username info
		exchanges.forEach((exchange) => {
			exchange.santaUser = { username: userIdToNameMap.get(exchange.santaId) };
			exchange.recipientUser = { username: userIdToNameMap.get(exchange.recipientId) };
		});

		return json({ success: true, data: exchanges }, { status: 307 });
	} catch (err: any) {
		console.error(JSON.stringify(err));
		if (err satisfies Error) {
			return json({ error: 'Internal server error: ' + JSON.stringify(err.message) }, { status: 501 });
		}
		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};

// export const DELETE: RequestHandler = async ({ request }) => {
// 	const { idsToDelete } = await request.json();

// 	try {
// 		if (idsToDelete) {
// 			await prisma.exchange.deleteMany({
// 				where: {
// 					id: {
// 						in: idsToDelete
// 					}
// 				}
// 			});

// 			await prisma.chat.deleteMany({});
// 		}

// 		return json({ success: true }, { status: 307 });
// 	} catch (err: any) {
// 		if (err satisfies Error) {
// 			return json({ error: 'Internal server error: ' + JSON.stringify(err.message) }, { status: 501 });
// 		}
// 		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
// 	}
// };

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

async function generateUserIdToNameMap(users: any[]) {
	let userIdToNameMap = new Map<number, string>();

	users.forEach((user) => {
		userIdToNameMap.set(user.id, user.username)
	});

	return userIdToNameMap;
}

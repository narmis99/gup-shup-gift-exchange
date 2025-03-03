import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals }) => {
	// console.log('request: ' + JSON.stringify(request));
	// const { params } = await request.json();
	// try {
	// 	if (!locals.user) {
	// 		return json({ error: 'Internal server error: No local user saved' }, { status: 501 });
	// 	}

	// 	const chatWhereSanta = await prisma.chat.findUnique({
	// 		where: {
	// 			santaId: locals.user.userId,
	// 		},
	// 		include: {
	// 			messages: {
	// 				orderBy: {
	// 					timestamp: 'asc', // Or 'desc' for latest messages first
	// 				},
	// 			},
	// 		}
	// 	});

	// 	const chatWhereRecipient = await prisma.chat.findUnique({
	// 		where: {
	// 			recipientId: locals.user.userId,
	// 		},
	// 		include: {
	// 			messages: {
	// 				orderBy: {
	// 					timestamp: 'asc', // Or 'desc' for latest messages first
	// 				},
	// 			},
	// 		}
	// 	});

	// 	// STODO: add validation
	return json({});
	// } catch (err) {
	// 	return json({ error: 'Internal server error: ' + err }, { status: 501 });
	// }
};

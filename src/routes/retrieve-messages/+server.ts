import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const requestData = await request.json();
	// STODO: add validation

	try {
		if (!locals.user) {
			return json({ error: 'Internal server error: No local user saved' }, { status: 501 });
		}

		let chat;
		console.log('isUserSanta: ' + JSON.stringify(requestData.isUserSanta));
		if (requestData.isUserSanta) {
			chat = await prisma.chat.findUnique({
				where: {
					santaId: locals.user.userId,
				},
				include: {
					messages: {
						orderBy: {
							timestamp: 'asc', // Or 'desc' for latest messages first
						},
					},
				}
			});
		} else {
			chat = await prisma.chat.findUnique({
				where: {
					recipientId: locals.user.userId,
				},
				include: {
					messages: {
						orderBy: {
							timestamp: 'asc', // Or 'desc' for latest messages first
						},
					},
				}
			});
		}

		// STODO: add validation
		return json({ chat });
	} catch (err) {
		return json({ error: 'Internal server error: ' + err }, { status: 501 });
	}
};

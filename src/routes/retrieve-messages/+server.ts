import { building } from '$app/environment';
import { prisma } from '$lib/server/prisma';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (building) {
		return new Response(null, { status: 204 });
	}
	const requestData = await request.json();

	try {
		if (!locals.user) {
			throw redirect(303, '/');
			// return json({ error: 'Internal server error: No local user found. Try signing in again.' }, { status: 501 });
		} else if (requestData.isUserSanta == null) {
			return json(
				{ error: 'Internal server error: Improper data when retrieving messages' },
				{ status: 501 }
			);
		}

		let chat;
		if (requestData.isUserSanta) {
			chat = await prisma.chat.findUnique({
				where: {
					santaId: locals.user.userId
				},
				include: {
					messages: {
						orderBy: {
							timestamp: 'asc'
						}
					}
				}
			});
		} else {
			chat = await prisma.chat.findUnique({
				where: {
					recipientId: locals.user.userId
				},
				include: {
					messages: {
						orderBy: {
							timestamp: 'asc'
						}
					}
				}
			});
		}
		return json({ chat });
	} catch (err) {
		console.error(JSON.stringify(err));
		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};

import { prisma } from '$lib/server/prisma';
import { json, type Actions } from '@sveltejs/kit';

let userId: string;

export async function load({ locals }) {
	if (!locals.user) {
		return { chats: [] };
	}
	userId = locals.user.userId;
	// userId: locals.user.userId

	const chatWhereSanta = await prisma.chat.findUnique({
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

	const chatWhereRecipient = await prisma.chat.findUnique({
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

	// STODO: add validation
	return { chats: [chatWhereSanta, chatWhereRecipient] };
}

export const actions: Actions = {
	message: async ({ request, cookies }) => {
		const formData: FormData = await request.formData();
		// STODO: fix, probably need to convert to number?
		const chatId = formData.get('chatId') as string;
		const message = formData.get('message') as string;
		console.log('userId: ' + userId);
		try {
			await prisma.message.create({
				data: {
					chatId: chatId,
					senderId: userId,
					content: message
				}
			});
			console.log('saved message!');
			return { success: true };
		} catch (err) {
			return json({ error: 'Internal server error: ' + err }, { status: 501 });
		}
	}
};

/**
 * Store AI-generated suggestions in the database, linked to the user.
 * Track feedback (e.g., thumbs up/down, comments) to refine future recommendations.
 * Offer a “Refresh Suggestions” button that fetches new AI ideas while considering past feedback.
 */
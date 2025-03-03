import { prisma } from '$lib/server/prisma';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { fail, type Actions } from '@sveltejs/kit';
/*
export async function load({ locals }) {
	if (!locals.user) {
		return { chats: [] };
	}

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
*/

export const actions: Actions = {
	message: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(500, { error: 'Internal server error: No local user found' });
		}

		const formData: FormData = await request.formData();
		const chatId = Number(formData.get('chatId'));
		const message = formData.get('message') as string;
		try {
			await prisma.message.create({
				data: {
					chatId: chatId,
					senderId: locals.user.userId,
					content: message
				}
			});
			return { success: true };
		} catch (err) {
			if (err instanceof PrismaClientValidationError) {
				return fail(500, { error: 'Internal prisma error: ' + JSON.stringify(err) });
			}
			return fail(500, { error: 'Internal server error: ' + JSON.stringify(err) });
		}
	}
};

/**
 * Store AI-generated suggestions in the database, linked to the user.
 * Track feedback (e.g., thumbs up/down, comments) to refine future recommendations.
 * Offer a “Refresh Suggestions” button that fetches new AI ideas while considering past feedback.
 */
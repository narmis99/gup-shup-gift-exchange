import { prisma } from '$lib/server/prisma';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	message: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/');
		}

		const formData: FormData = await request.formData();
		const chatId = Number(formData.get('chatId'));
		const message = formData.get('message') as string;

		if (!chatId || !message) {
			return fail(501, { error: 'Internal server error: Improper data when posting message' });
		}

		// don't post if empty message
		if (message.length == 0) {
			return;
		}

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
			console.error(JSON.stringify(err));
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
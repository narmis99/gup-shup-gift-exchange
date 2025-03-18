import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { wishes: [] };
	}

	const wishes = await prisma.wish.findMany({
		select: {
			id: true,
			name: true,
			url: true,
			rating: true,
			comment: true
		},
		where: {
			userId: locals.user.userId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { wishes };
}

/**
 * Store AI-generated suggestions in the database, linked to the user.
 * Track feedback (e.g., thumbs up/down, comments) to refine future recommendations.
 * Offer a “Refresh Suggestions” button that fetches new AI ideas while considering past feedback.
 */
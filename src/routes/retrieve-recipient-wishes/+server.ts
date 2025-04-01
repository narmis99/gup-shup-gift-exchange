import { prisma } from '$lib/server/prisma';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const requestData = await request.json();

	try {
		if (!locals.user) {
			throw redirect(303, '/');
			// return json({ error: 'Internal server error: No local user found. Try signing in again.' }, { status: 501 });
		} else if (!requestData.recipientId) {
			return json({ error: 'Internal server error: Improper data when retrieving recipient wishlist' }, { status: 501 });
		}

		const recipientWishes = await prisma.wish.findMany({
			select: {
				id: true,
				name: true,
				url: true,
				rating: true,
				comment: true
			},
			where: {
				userId: requestData.recipientId
			},
			orderBy: {
				createdAt: 'desc' // STODO: update this to rating?
			}
		});

		return json({ wishes: recipientWishes });
	} catch (err) {
		console.error(JSON.stringify(err));
		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};

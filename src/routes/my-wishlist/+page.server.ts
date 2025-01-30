import { redirect, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function load({ locals }) {
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

export const actions: Actions = {
	createWish: async ({ request, locals }) => {
		const wishData = await request.formData();
		const name = wishData.get('name') as string;
		const url = wishData.get('url') as string;
		const comment = wishData.get('comment') as string;
		const rating = Number(wishData.get('rating'));

		await prisma.wish.create({
			data: {
				name: name,
				url: url,
				comment: comment,
				rating: rating,
				userId: locals.user?.userId
			}
		});

		await redirect(303, '/my-wishlist');
	}
};

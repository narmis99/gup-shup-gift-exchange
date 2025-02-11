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
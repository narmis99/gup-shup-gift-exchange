import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/');
	}

	const exchanges = await prisma.exchange.findMany({
		select: {
			id: true,
			year: true,
			santaUser: { select: { username: true } },
			recipientUser: { select: { username: true } }
		},
		where: {
			year: new Date().getUTCFullYear()
		}
	});

	return { exchanges };
};

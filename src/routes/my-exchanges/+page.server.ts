import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { exchanges: [] };
	}

	const exchanges = await prisma.exchange.findMany({
		select: { santaId: true, recipientId: true },
		where: {
			santaId: locals.user.userId,
			// OR: [{ santaId: locals.user.userId }, { recipientId: locals.user.userId }],
			year: 2026
		}
	});

	if (exchanges.length == 0) {
		return fail(500, { error: 'Internal server error: No exchanges found.' });
	}

	const recipient = await prisma.user.findUnique({
		select: { username: true, birthdate: true }, where: { id: exchanges[0].recipientId }
	});

	return { exchanges, recipient };
};

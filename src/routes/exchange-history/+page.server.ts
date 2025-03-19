import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const previousExchanges = await prisma.exchange.findMany({
		select: {
			year: true,
			present: true,
			santaUser: { select: { username: true } },
			recipientUser: { select: { username: true } }
		},
		where: {
			NOT: {
				// STODO: remove + 1
				year: new Date().getUTCFullYear() + 1
			}
		},
		orderBy: {
			year: 'desc'
		}
	});

	return { exchanges: previousExchanges };
};

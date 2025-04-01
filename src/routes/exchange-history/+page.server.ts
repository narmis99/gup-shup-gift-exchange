import { building } from '$app/environment';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (building) {
		return;
	}

	const previousExchanges = await prisma.exchange.findMany({
		select: {
			year: true,
			present: true,
			santaUser: { select: { username: true } },
			recipientUser: { select: { username: true } }
		},
		where: {
			NOT: {
				year: new Date().getUTCFullYear()
			}
		},
		orderBy: {
			year: 'desc'
		}
	});

	return { exchanges: previousExchanges };
};

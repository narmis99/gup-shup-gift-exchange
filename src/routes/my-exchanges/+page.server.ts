import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/');
		// return { exchanges: [] };
	}

	// STODO: reveal santa when users birthday has passed?
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
		select: { id: true, username: true, birthdate: true },
		where: { id: exchanges[0].recipientId }
	});

	if (!recipient?.birthdate) {
		// STODO: something went wrong
		return { exchanges, recipient };
	}

	let isBirthdayToday: boolean = false;
	let formattedBirthday: Date | undefined;
	const birthdate: Date = recipient.birthdate;
	const birthMonth: number = birthdate.getUTCMonth();
	const birthDay: number = birthdate.getUTCDate();

	const now = new Date();

	if (now.getMonth() === birthMonth && now.getDate() === birthDay) {
		isBirthdayToday = true;
	} else {
		const currentYear = now.getUTCFullYear();
		const nextBirthday = new Date(currentYear, birthMonth, birthDay, 0, 0, 0, 0);

		formattedBirthday = now > nextBirthday ? undefined : nextBirthday;
	}

	/**
	 * recipientBirthday and isBirthdayToday are the two indicators to differentiate between the three states:
	 * 	1. birthday passed
	 * 	2. birthday today
	 * 	3. upcoming birthday
	 */
	return { exchanges, recipient, recipientBirthday: formattedBirthday, isBirthdayToday };
};

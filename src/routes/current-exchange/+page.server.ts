import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// STODO: https://svelte.dev/tutorial/kit/error-pages

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/');
	}

	const exchanges = await prisma.exchange.findMany({
		select: { santaId: true, recipientId: true },
		where: {
			santaId: locals.user.userId,
			// OR: [{ santaId: locals.user.userId }, { recipientId: locals.user.userId }],
			// STODO: remove +1
			year: new Date().getUTCFullYear()
		}
	});

	if (exchanges.length == 0) {
		return {};
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

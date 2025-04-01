import { building } from '$app/environment';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (building) {
		return;
	}

	if (!locals.user) {
		return {};
	}

	if (!locals.user.birthdate) {
		return fail(500, { error: 'Internal server error: No birthday found. Try signing in again.' });
	}

	let isBirthdayToday: boolean = false;
	let formattedBirthday: Date | undefined;
	const birthdate: Date = locals.user.birthdate;
	const birthMonth: number = birthdate.getUTCMonth();
	const birthDay: number = birthdate.getUTCDate();

	const now = new Date();

	if (now.getMonth() === birthMonth && now.getDate() === birthDay) {
		isBirthdayToday = true;
	} else {
		const currentYear = now.getUTCFullYear();
		const nextBirthday = new Date(currentYear, birthMonth, birthDay, 0, 0, 0, 0);

		if (now > nextBirthday) {
			nextBirthday.setFullYear(currentYear + 1);
		}

		formattedBirthday = nextBirthday;
	}

	return { user: locals.user, nextBirthday: formattedBirthday, isBirthdayToday };
};

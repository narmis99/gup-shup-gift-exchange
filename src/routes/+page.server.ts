import { json } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user == undefined) {
		return {};
	}

	if (locals.user.birthdate == undefined) {
		// STODO: add messaging
		return {};
		// return json({ success: true }, { status: 307 });
		// return fail(500, { error: 'Internal server error: No local user found. Try signing in again.' });
	}

	const birthdate: Date = locals.user.birthdate;
	const birthMonth: number = birthdate.getUTCMonth();
	const birthDay: number = birthdate.getUTCDate();

	const now = new Date();

	if (now.getMonth() === birthMonth && now.getDate() === birthDay) {
		return { user: locals.user }
	}
	const currentYear = now.getUTCFullYear();
	const nextBirthday = new Date(currentYear, birthMonth, birthDay, 0, 0, 0, 0);

	if (now > nextBirthday) {
		nextBirthday.setFullYear(currentYear + 1);
	}

	return { user: locals.user, nextBirthday: nextBirthday };
};
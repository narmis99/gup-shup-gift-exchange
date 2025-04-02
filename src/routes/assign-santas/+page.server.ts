import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	if (building) {
		return;
	}

	if (!locals.user) {
		throw redirect(303, '/');
	}

	const response = await fetch('/retrieve-exchanges');
	const exchanges = await response.json();

	return exchanges;
};

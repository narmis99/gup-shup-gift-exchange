import { building } from '$app/environment';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (building) {
		return;
	}

	return { user: locals.user };
};

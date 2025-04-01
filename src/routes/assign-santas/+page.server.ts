import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	console.log('loading...');
	if (!locals.user) {
		throw redirect(303, '/');
	}

	const response = await fetch('/retrieve-exchanges');
	const exchanges = await response.json();
	console.log('exchanges ins erver: ' + JSON.stringify(exchanges));
	return exchanges;

	// const exchanges = await prisma.exchange.findMany({
	// 	select: {
	// 		id: true,
	// 		year: true,
	// 		santaUser: { select: { username: true } },
	// 		recipientUser: { select: { username: true } }
	// 	},
	// 	where: {
	// 		year: new Date().getUTCFullYear()
	// 	}
	// });

	// return { exchanges };

	// const response = await fetch('/retrieve-exchanges', {
	// 	method: 'POST',
	// 	headers: {
	// 		'content-type': 'application/json'
	// 	}
	// });

	// const result = await response.json();

	// if (result.error) {
	// 	return { exchanges: [], errorMessage: 'Something went wrong when retrieving exchanges: ' + JSON.stringify(result.error) }
	// 	// return { error: 'Something went wrong when retrieving exchanges: ' + JSON.stringify(result.error) };
	// } else if (result.success) {
	// 	return { exchanges: result.data };
	// } else {
	// 	return { exchanges: [] };
	// }
};

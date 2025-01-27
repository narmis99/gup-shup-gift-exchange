import type { Actions } from '@sveltejs/kit';
export async function load({ locals }) {
	console.log('locals on load: ' + JSON.stringify(locals.user));
	return { user: locals.user };
}

export const actions: Actions = {
	createWish: async ({ request, cookies }) => {
		const wishData = await request.formData();
		console.log('creating wish');
		console.log('request: ' + JSON.stringify(request));
		console.log('wishData: ' + JSON.stringify(wishData));
		const name = wishData.get('name') as string;
		const url = wishData.get('url') as string;
		const comment = wishData.get('comment') as string;
		const rating = wishData.get('rating') as string;
		const userId = wishData.get('userId') as string;

		console.log('name: ' + name);
		console.log('url: ' + url);
		console.log('comment: ' + comment);
		console.log('rating: ' + rating);
		console.log('userId: ' + userId);

		// console.log('session: ' + )
		// await prisma.wish.create({
		// 	data: {

		// 	}
		// });
	}
	// STODO: either move login/logout to layout or call parent
	// logout: async ({ cookies }) => {
	// 	try {
	// 		const sessionToken = cookies.get('session_token') as string;

	// 		if (sessionToken) {
	// 			await prisma.session.delete({
	// 				where: {
	// 					token: sessionToken
	// 				}
	// 			});

	// 			cookies.delete('session_token', {
	// 				path: '/',
	// 				httpOnly: true,
	// 				secure: process.env.NODE_ENV === 'production',
	// 				sameSite: 'lax'
	// 			});
	// 		}
	// 		return { success: true };
	// 	} catch (err) {
	// 		return fail(500, { error: 'Internal server error: ' + err });
	// 	}
	// }
};

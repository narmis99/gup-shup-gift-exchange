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

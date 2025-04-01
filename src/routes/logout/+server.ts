import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ cookies }) => {
	try {
		const sessionToken = cookies.get('session_token') as string;

		if (sessionToken) {
			await prisma.session.delete({
				where: {
					token: sessionToken
				}
			});

			cookies.delete('session_token', {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax'
			});
		}

		return json({ success: true }, { status: 307 });
	} catch (err) {
		console.error(JSON.stringify(err));
		return json({ error: 'Internal server error: ' + err }, { status: 501 });
	}
};

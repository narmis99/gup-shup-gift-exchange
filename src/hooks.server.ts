import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('handle in hooks.server.ts');
	const sessionToken = event.cookies.get('session_token');

	if (sessionToken) {
		const session = await prisma.session.findUnique({
			where: { token: sessionToken },
			include: { user: true }
		});

		if (session) {
			console.log('setting sessionId and user');
			event.locals.sessionId = session.id;
			event.locals.user = {
				userId: session.user.id,
				username: session.user.username,
				birthdate: session.user.birthdate
			};
		}
	}

	return await resolve(event);
};

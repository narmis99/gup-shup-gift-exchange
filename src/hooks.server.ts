import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session_token');

	if (sessionToken) {
		const session = await prisma.session.findUnique({
			where: { token: sessionToken },
			include: { user: true }
		});

		if (session) {
			event.locals.sessionId = session.id;
			event.locals.user = {
				username: session.user.username,
				birthdate: session.user.birthdate
			};
		}
	}
	return resolve(event);
};

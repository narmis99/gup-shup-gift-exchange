import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	if (building) {
		return new Response(null, { status: 204 });
	}

	const sessionToken = event.cookies.get('session_token');

	if (sessionToken) {
		const session = await prisma.session.findUnique({
			where: { token: sessionToken },
			include: { user: true }
		});

		if (session) {
			event.locals.sessionId = session.id;
			event.locals.user = {
				userId: session.user.id,
				username: session.user.username,
				birthdate: session.user.birthdate,
				isAdmin: session.user.isAdmin
			};
		}
	}

	return resolve(event);
};

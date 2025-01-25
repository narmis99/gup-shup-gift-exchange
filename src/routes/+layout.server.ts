import { prisma } from '$lib/server/prisma.js';

export async function load({ cookies }) {
	const sessionToken = cookies.get('session_token') as string;

	if (!sessionToken) {
		return { user: null };
	}

	const session = await prisma.session.findUnique({
		where: { token: sessionToken },
		include: { user: true }
	});

	if (!session) {
		return { user: null };
	}

	return { user: session.user };
}

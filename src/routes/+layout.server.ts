import { prisma } from '$lib/server/prisma.js';

export async function load({ cookies }) {
	console.log('Cookies:', cookies.getAll()); // Log all cookies
	const sessionToken = cookies.get('session_token') as string;
	console.log('retrieved sessionToken: ' + sessionToken);

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

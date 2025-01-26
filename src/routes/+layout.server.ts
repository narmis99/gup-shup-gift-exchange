// import { prisma } from '$lib/server/prisma.js';

export async function load({ locals }) {
	return { user: locals.user };
}

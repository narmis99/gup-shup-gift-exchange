// import { prisma } from '$lib/server/prisma.js';

export async function load({ locals }) {
	console.log('loading in layout');
	return { user: locals.user };
}

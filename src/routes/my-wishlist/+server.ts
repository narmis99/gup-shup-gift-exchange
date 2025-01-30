import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { name, url, rating, comment } = await request.json();
	try {
		await prisma.wish.create({
			data: {
				name: name,
				url: url,
				comment: comment,
				rating: rating,
				userId: locals.user?.userId
			}
		});
		return json({ success: true }, { status: 307 });
	} catch (err) {
		return json({ error: 'Internal server error: ' + err }, { status: 501 });
	}
};

export const PATCH: RequestHandler = async ({ request }) => {
    const { id, name, url, rating, comment } = await request.json();
	try {
		await prisma.wish.update({
			where: {
				id: id
			},
			data: {
				name: name,
				url: url,
				rating: rating,
				comment: comment
			}
		});
		return json({ success: true }, { status: 307 });
	} catch (err) {
		return json({ error: 'Internal server error: ' + err }, { status: 501 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { id } = await request.json();
	try {
		await prisma.wish.delete({
			where: {
				id: id
			}
		});
		return json({ success: true }, { status: 307 });
	} catch (err) {
		return json({ error: 'Internal server error: ' + err }, { status: 501 });
	}
};

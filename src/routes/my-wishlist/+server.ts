// https://www.prisma.io/docs/orm/reference/error-reference#error-codes
import { building } from '$app/environment';
import { prisma } from '$lib/server/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (building) {
		return new Response(null, { status: 204 });
	}

	const cardData = await request.json();

	try {
		await prisma.wish.create({
			data: {
				name: cardData.name,
				url: cardData.url ?? '',
				comment: cardData.comment ?? '',
				rating: cardData.rating,
				userId: locals.user?.userId
			}
		});

		return json({ success: true }, { status: 307 });
	} catch (err) {
		console.error(JSON.stringify(err));
		if (err instanceof PrismaClientKnownRequestError) {
			if (err.code == 'P2002') {
				return json({ error: 'A wish with this name already exists!' }, { status: 409 });
			}
		}

		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};

export const PATCH: RequestHandler = async ({ request }) => {
	if (building) {
		return new Response(null, { status: 204 });
	}

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
		if (err instanceof PrismaClientKnownRequestError) {
			if (err.code == 'P2002') {
				return json({ error: 'A wish with this name already exists!' }, { status: 409 });
			}
		}

		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	if (building) {
		return new Response(null, { status: 204 });
	}

	const { id } = await request.json();
	try {
		await prisma.wish.delete({
			where: {
				id: id
			}
		});
		return json({ success: true }, { status: 307 });
	} catch (err) {
		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};

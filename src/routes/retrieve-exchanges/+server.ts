import { building } from '$app/environment';
import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	if (building) {
		return new Response(null, { status: 204 });
	}

	try {
		const exchanges = await prisma.exchange.findMany({
			select: {
				id: true,
				year: true,
				santaUser: { select: { username: true } },
				recipientUser: { select: { username: true } }
			},
			where: {
				year: new Date().getUTCFullYear()
			}
		});

		return json({ exchanges });
	} catch (err: any) {
		console.error(JSON.stringify(err));
		if (err satisfies Error) {
			return json(
				{ error: 'Internal server error: ' + JSON.stringify(err.message) },
				{ status: 501 }
			);
		}
		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};

import { prisma } from '$lib/server/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
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

		console.log('exchanges found: ' + JSON.stringify(exchanges));
		return json({ exchanges });
		// return json({ success: true, data: exchanges }, { status: 307 });
	} catch (err: any) {
		if (err satisfies Error) {
			return json({ error: 'Internal server error: ' + JSON.stringify(err.message) }, { status: 501 });
		}
		return json({ error: 'Internal server error: ' + JSON.stringify(err) }, { status: 501 });
	}
};
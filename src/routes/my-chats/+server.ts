// https://www.prisma.io/docs/orm/reference/error-reference#error-codes
// import { prisma } from '$lib/server/prisma';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import { json, type RequestHandler } from '@sveltejs/kit';

// export const POST: RequestHandler = async ({ request, locals }) => {
	// const cardData = await request.json();

	// try {
	// 	await prisma.wish.create({
	// 		data: {
	// 			name: cardData.name,
	// 			url: cardData.url ?? '',
	// 			comment: cardData.comment ?? '',
	// 			rating: cardData.rating,
	// 			userId: locals.user?.userId
	// 		}
	// 	});

	// 	return json({ success: true }, { status: 307 });
	// } catch (err) {
	// 	if (err instanceof PrismaClientKnownRequestError) {
	// 		if (err.code == 'P2002') {
	// 			return json({ error: 'A wish with this name already exists!' }, { status: 409 });
	// 		}
	// 	}

	// 	return json({ error: 'Internal server error: ' + err }, { status: 501 });
	// }
// };
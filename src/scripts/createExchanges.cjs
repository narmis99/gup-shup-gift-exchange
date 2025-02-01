const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertExchange = async (year, present, santaId, recipientId) => {
	try {
		await prisma.exchange.create({
			data: {
				year: year,
				present: present,
				santaId: santaId,
				recipientId: recipientId
			}
		});
		console.log(`Exchange inserted successfully!`);
	} catch (err) {
		console.error('Error inserting user:', err);
	}
};

// (async () => {
// 	await insertExchange(2024, 'bombas socks and workout shorts', 6, 2);
// 	await insertExchange(2024, '', 5, 3);
// 	await insertExchange(2024, '', 3, 4);
// 	await insertExchange(2024, '', 2, 5);
// 	await insertExchange(2024, 'gold jewelry', 4, 6);
// })();

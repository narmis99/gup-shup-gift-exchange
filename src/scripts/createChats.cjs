const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const insertChat = async (santaId, recipientId) => {
	try {
		await prisma.chat.create({
			data: {
				santaId: santaId,
				recipientId: recipientId
			}
		});
		console.log(`Chat inserted successfully!`);
	} catch (err) {
		console.error('Error inserting chat:', err);
	}
};

// STODO: update so that chats are unique
(async () => {
	// await insertChat(1, 2);
	// await insertChat(3, 1);
})();

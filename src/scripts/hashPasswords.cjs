
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const hashPassword = async (password) => {
	const saltRounds = 10;
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		console.log(`Hashed password: ${hashedPassword}`);
		return hashedPassword;
	} catch (err) {
		console.error('Error hashing password:', err);
		throw err;
	}
};

const insertUser = async (username, passkey, birthdate, isAdmin) => {
	const hashedPassword = await hashPassword(passkey);

	if (hashedPassword) {
		try {
			await prisma.user.create({
				data: {
					username,
					passkeyHash: hashedPassword,
					birthdate: new Date(birthdate),
					isAdmin: isAdmin
				}
			});
			console.log(`User ${username} inserted successfully!`);
		} catch (err) {
			console.error('Error inserting user:', err);
		}
	}
};

// const hashPasswordOfExistingUser = async (id, passkey) => {
// 	const hashedPassword = await hashPassword(passkey);
// 	if (hashedPassword) {
// 		try {
// 			const query = 'UPDATE users SET passkey=$1 WHERE id=$2';
// 			await pool.query(query, [hashedPassword, id]);
// 			console.log(`User ${id} updated successfully!`);
// 		} catch (err) {
// 			console.error('Error inserting user:', err);
// 		}
// 	}
// };


// (async () => {
// 	await insertUser('test_user_SS', 'pa55w0rd&', '2025-01-20', true);
// 	await insertUser('angadraj', 'atablawithoutaholeinit33!', '1991-06-09', false);
// 	await insertUser('ravnit', 'ilovepeople55+', '1991-10-26', false);
// 	await insertUser('yuvraj', 'camaro0car$', '1994-03-14', false);
// 	await insertUser('sahejveer', 'hikingsurfingandskating0hmy!', '1996-05-11', false);
// 	await insertUser('simran', 'gl4diator07%', '1999-12-16', false);
// })();

// (async () => {
// 	await hashPasswordOfExistingUser('2', 'atablawithoutaholeinit33!');
// 	await hashPasswordOfExistingUser('3', 'camaro0car$');
// 	pool.end();
// })();

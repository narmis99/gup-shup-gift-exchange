const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// Configure your PostgreSQL connection
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'gup_shup_gift_exchange',
	password: 'BhangraChakde99!',
	port: 5432
});

// Function to hash a password
const hashPassword = async (password) => {
	const saltRounds = 10;
	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		console.log(`Hashed password: ${hashedPassword}`);
		return hashedPassword;
	} catch (err) {
		console.error('Error hashing password:', err);
	}
};

// Function to insert a user with hashed password into the database
const insertUser = async (username, passkey, birthday) => {
	const hashedPassword = await hashPassword(passkey);
	if (hashedPassword) {
		try {
			const query = 'INSERT INTO users (username, passkey, birthday) VALUES ($1, $2, $3)';
			await pool.query(query, [username, hashedPassword, birthday]);
			console.log(`User ${username} inserted successfully!`);
		} catch (err) {
			console.error('Error inserting user:', err);
		}
	}
};

// Function to insert a user with hashed password into the database
const hashPasswordOfExistingUser = async (id, passkey) => {
	const hashedPassword = await hashPassword(passkey);
	if (hashedPassword) {
		try {
			const query = 'UPDATE users SET passkey=$1 WHERE id=$2';
			await pool.query(query, [hashedPassword, id]);
			console.log(`User ${id} updated successfully!`);
		} catch (err) {
			console.error('Error inserting user:', err);
		}
	}
};

// Example: Insert a user with username and password
// (async () => {
// 	await insertUser('ravnit', 'ilovepeople55+', '1991-10-26');
// 	await insertUser('sahejveer', 'hikingsurfingandskating0hmy!', '1996-05-11');
// 	pool.end();
// })();

// (async () => {
// 	await hashPasswordOfExistingUser('2', 'atablawithoutaholeinit33!');
// 	await hashPasswordOfExistingUser('3', 'camaro0car$');
// 	pool.end();
// })();

// snote: currently useless
import bcrypt from 'bcrypt';
// import { getUser } from '$lib/db';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT
});

async function getUser(username) {
	const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return res.rows[0];
}

async function loginUser(username, passkey) {
	const user = await getUser(username);
	if (user && (await bcrypt.compare(passkey, user.password_hash))) {
		return { success: true, user };
	}
	return { success: false };
}

module.exports = {
	getUser,
	loginUser
};

// @ts-nocheck
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'gup_shup_gift_exchange',
	password: 'BhangraChakde99!',
	port: '5431'
});

export async function getUser(username) {
	const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return res.rows[0];
}

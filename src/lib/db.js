import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

export const getUser = async (username) => {
	const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return res.rows[0];
};


// import bcrypt from 'bcrypt';
// import { getUser } from '$lib/db';

// export const loginUser = async (username, password) => {
//     const user = await getUser(username);
//     if (user && await bcrypt.compare(password, user.password_hash)) {
//         // User is authenticated
//         return { success: true, user };
//     }
//     return { success: false };
// };

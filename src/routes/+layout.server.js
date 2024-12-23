// @ts-nocheck
import bcrypt from 'bcryptjs';
import pool from '$lib/server/database.js'; // Replace with your PostgreSQL connection

export const actions = {
	default: async ({ request }) => {
		console.log('POST request: ' + request);
		
		// parse form data
		const loginData = await request.formData();
		const username = loginData.get('username');
		console.log('username: ' + username);
		const passkey = loginData.get('passkey');
		console.log('passkey: ' + passkey);

		$inspect(username);
		$inspect(passkey);

		// Validate user in the database
		const query = 'SELECT passkey FROM users WHERE username = $1';
		const result = await pool.query(query, [username]);

		if (result.rows.length === 0) {
			return { status: 401, message: 'Invalid username or password' };
		}

		const isValid = await bcrypt.compare(passkey, result.rows[0].passkey);
		if (!isValid) {
			return { status: 401, message: 'Invalid username or password' };
		}

		console.log('Login successful');
		return {isLoggedIn: true};

		// try {
		// 	// Query the database for the user
		// 	const { rows } = await pool.query('SELECT passkey FROM users WHERE username = $1', [
		// 		username
		// 	]);

		// 	if (rows.length === 0) {
		// 		return { error: 'User not found' };
		// 	}

		// 	const hashedPasskey = rows[0].passkey;

		// 	// Validate the passkey
		// 	const isValid = bcrypt.compareSync(passkey, hashedPasskey);
		// 	if (!isValid) {
		// 		return { error: 'Invalid credentials' };
		// 	}

		// 	// On successful login, you can redirect or set session data
		// 	return { success: true };
		// } catch (error) {
		// 	console.error(error);
		// 	return { error: 'An internal error occurred. Please try again later.' };
		// }
	}
};

// import * as db from '$lib/server/database.js';
// import bcrypt from 'bcryptjs';
// import pool from '$lib/db'; // Import your data base connection pool

// export const POST = async ({ request }) => {
// 	console.log('request: ' + request);
// 	try {
// 		const { username, passkey } = await request.json();

// 		// Query the database for the user
// 		const { rows } = await pool.query('SELECT passkey FROM users WHERE username = $1', [username]);

// 		if (rows.length === 0) {
// 			return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
// 		}

// 		const hashedPasskey = rows[0].passkey;

// 		// Validate the passkey
// 		const isValid = bcrypt.compareSync(passkey, hashedPasskey);
// 		if (!isValid) {
// 			return new Response(JSON.stringify({ error: 'Invalid passkey' }), { status: 401 });
// 		}

// 		// Optionally, set a session or authentication cookie here
// 		return new Response(JSON.stringify({ success: true }), { status: 200 });
// 	} catch (error) {
// 		console.error(error);
// 		return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
// 	}
// };

// -------------------------------------------------------------------------

// import * as db from '$lib/server/database.js';
// import bcrypt from 'bcryptjs';

// export async function loginUser(username, passkey) {
// 	const user = await db.getUser(username);
// 	console.log('user: ' + user);
// 	if (user && (await bcrypt.compare(passkey, user.password_hash))) {
// 		return { success: true, user };
// 	}
// 	return { success: false };
// }

// export const actions = {
// 	default: async ({ cookies, request }) => {
// 		const data = await request.formData();
// 		db.createTodo(cookies.get('userid'), data.get('description'));
// 	}
// };

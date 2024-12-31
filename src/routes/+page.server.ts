// @ts-nocheck
import { fail } from '@sveltejs/kit';
import type { Actions } from '../../.svelte-kit/types/src/routes/$types';
import bcrypt from 'bcryptjs';
import { pool } from '../lib/server/database';

export const actions: Actions = {
	default: async ({ request }) => {
		console.log('POST request: ' + JSON.stringify(request));

		// parse form data
		const loginData = await request.formData();
		const username = loginData.get('username');
		console.log('username: ' + username);
		const passkey = loginData.get('passkey');
		console.log('passkey: ' + passkey);

		try {
			// validate user in the database
			const query = 'SELECT passkey FROM users WHERE username = $1';
			const result = await pool.query(query, [username]);

			if (result.rows.length === 0) {
				console.log('fail 1');
				return fail(400, { error: 'Invalid credentials', username });
				// return fail({ username, error: 'Invalid credentials' });
			}
			const isValid = await bcrypt.compare(passkey, result.rows[0].passkey);

			if (!isValid) {
				console.log('fail 2');
				return fail(400, { error: 'Invalid credentials', username });
				// return fail({ username, error: 'Invalid credentials' });
			}

			return { success: true };
		} catch (error) {
			console.log('database error: ' + error);
			return fail(500, { error: 'Internal server error' });
		}

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

import { fail } from '@sveltejs/kit';
import type { Actions } from '../../.svelte-kit/types/src/routes/$types';
import bcrypt from 'bcryptjs';
import { pool } from '../lib/server/database';

export const actions: Actions = {
	default: async ({ request }) => {
		// parse form data
		const loginData = await request.formData();
		const username = loginData.get('username');
		const passkey = loginData.get('passkey');

		try {
			// validate user in the database
			const query = 'SELECT passkey FROM users WHERE username = $1';
			const result = await pool.query(query, [username]);

			if (result.rows.length === 0) {
				return fail(400, { error: 'Invalid credentials', username });
			}
			const isValid = await bcrypt.compare(passkey, result.rows[0].passkey);

			if (!isValid) {
				return fail(400, { error: 'Invalid credentials', username });
			}

			return { success: true };
		} catch (error) {
			return fail(500, { error: 'Internal server error: ' + error });
		}
	}
};
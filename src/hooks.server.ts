import type { Handle } from '@sveltejs/kit';
import { pool } from '$lib/server/database';

export const handle: Handle = async ({ event, resolve }) => {
	// Read session token from cookies
	const sessionToken = event.cookies.get('session');

	if (sessionToken) {
		// Fetch user from DB based on session token
		const result = await pool.query('SELECT id, username FROM users WHERE session_token = $1', [sessionToken]);

		if (result.rows.length > 0) {
			event.locals.user = result.rows[0]; // Store user in event.locals
		}
	}

	// Continue request
	return resolve(event);
};

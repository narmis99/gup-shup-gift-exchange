import type { Handle } from '@sveltejs/kit';
import { pool } from '$lib/server/database';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session');

	if (sessionToken) {
		const result = await pool.query('SELECT id, username FROM users WHERE session_token = $1', [sessionToken]);

		if (result.rows.length > 0) {
			event.locals.user = result.rows[0];
		}
	}
	return resolve(event);
};

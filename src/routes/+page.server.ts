import { fail } from '@sveltejs/kit';
import type { Actions } from '../../.svelte-kit/types/src/routes/$types';
import bcrypt from 'bcryptjs';
// import { pool } from '../lib/server/database';
import { prisma } from '$lib/server/prisma';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		// parse form data
		const loginData = await request.formData();
		const username = loginData.get('username');
		const passkey = loginData.get('passkey');

		try {
			// validate user in database
			const user = await prisma.user.findUnique({
				where: {
					username: username
				}
			});

			if (!user) {
				return fail(400, { error: 'Invalid credentials', username });
			}

			console.log('found user: ' + JSON.stringify(user));

			// Compare password hash with bcrypt
			const isValid = await bcrypt.compare(passkey, user.passkeyHash);

			if (!isValid) {
				return fail(400, { error: 'Invalid credentials', username });
			}

			// -----------------
			// validate user in the database
			// const query = 'SELECT id, passkey FROM users WHERE username = $1';
			// const result = await pool.query(query, [username]);

			// if (result.rows.length === 0) {
			// 	return fail(400, { error: 'Invalid credentials', username });
			// }
			// const user = result.rows[0];
			// console.log('user: ' + JSON.stringify(user));
			// const isValid = await bcrypt.compare(passkey, result.rows[0].passkey);

			// if (!isValid) {
			// 	return fail(400, { error: 'Invalid credentials', username });
			// }

			// generate session token
			const sessionToken = crypto.randomUUID();
			console.log('sessionToken: ' + sessionToken);

			console.log('setting cookie...');
			// store session token in cookie
			cookies.set('session_token', sessionToken, {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 2 // 2 hours
				// maxAge: 60 * 60 * 24 * 7 // week (in seconds)
			});
			console.log('cookie set!: ' + JSON.stringify(cookies));

			// Optionally store sessionToken in DB (if using sessions table)
			// await pool.query('UPDATE users SET userAuthToken = $1 WHERE id = $2', [sessionToken, user.id]);
			await prisma.session.create({
				data: {
					token: sessionToken,
					userId: user.id
				}
			});

			return { success: true };
		} catch (error) {
			return fail(500, { error: 'Internal server error: ' + error });
		}
	}
};

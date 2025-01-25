import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '../../.svelte-kit/types/src/routes/$types';
import bcrypt from 'bcryptjs';
// import { pool } from '../lib/server/database';
import { prisma } from '$lib/server/prisma';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		// parse form data
		const loginData = await request.formData();
		const username = loginData.get('username') as string;
		const passkey = loginData.get('passkey') as string;

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
	},
	logout: async ({ cookies }) => {
		console.log('logging out...');
		const sessionToken = cookies.get('session_token') as string;

		if (sessionToken) {
			await prisma.session.delete({
				where: {
					token: sessionToken
				}
			});

			cookies.delete('session_token', {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax'
			});
		}
		throw redirect(302, '/');
	}
};

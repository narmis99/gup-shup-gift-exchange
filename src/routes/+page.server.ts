import { fail } from '@sveltejs/kit';
import type { Actions } from '../../.svelte-kit/types/src/routes/$types';
import bcrypt from 'bcryptjs';
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

			// compare hashed passkey
			const isValid = await bcrypt.compare(passkey, user.passkeyHash);

			if (!isValid) {
				return fail(400, { error: 'Invalid credentials', username });
			}

			// generate session token
			const sessionToken = crypto.randomUUID();

			// store session token in cookie
			cookies.set('session_token', sessionToken, {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 60 * 60 * 2 // 2 hours
				// maxAge: 60 * 60 * 24 * 7 // week (in seconds)
			});

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
		try {
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
			return { success: true };
		} catch (error) {
			return fail(500, { error: 'Internal server error: ' + error });
		}
	}
};

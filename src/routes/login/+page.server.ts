import { prisma } from '$lib/server/prisma';
import { fail, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		try {
			// parse form data
			const loginData = await request.formData();
			const username = loginData.get('username') as string;
			const passkey = loginData.get('passkey') as string;

			// validate user in database
			const user = await prisma.user.findUnique({
				where: {
					username: username
				}
			});

			if (!user) {
				return fail(400, { error: 'Invalid credentials' });
			}

			// compare hashed passkey
			const isValid = await bcrypt.compare(passkey, user.passkeyHash);

			if (!isValid) {
				return fail(400, { error: 'Invalid credentials' });
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
		} catch (err) {
			throw fail(500, { error: 'Internal server error: ' + JSON.stringify(err) });
		}
	}
};
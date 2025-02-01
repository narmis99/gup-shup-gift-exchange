import { fail } from '@sveltejs/kit';
import type { Actions } from '../../.svelte-kit/types/src/routes/$types';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return { user: locals.user };
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
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
				return fail(400, { error: 'Invalid credentials', username });
			}

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
		} catch (err) {
			throw fail(500, { error: 'Internal server error: ' + err });
		}
	}
};

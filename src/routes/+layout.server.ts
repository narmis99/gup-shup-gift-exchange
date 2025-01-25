// import { cookies } from '@sveltejs/kit';
import { pool } from '$lib/server/database';

export async function load({ cookies }) {
    console.log('Cookies:', cookies.getAll()); // Log all cookies
    console.log('\ncookies in +layout.server.ts: ' + JSON.stringify(cookies));
    const sessionToken = cookies.get('session_token');

    if (!sessionToken) {
        return { user: null };
    }

    // Validate session_token in the database
    // const result = await pool.query('SELECT id FROM users WHERE session_token = $1', [sessionToken]);

    // if (result.rows.length === 0) {
    //     return { user: null }; // Invalid session, treat as logged out
    // }

    // // Fetch user details
    // const user = await pool.query('SELECT id, username, birthday FROM users WHERE id = $1', [result.rows[0].id]);

    // return {
    //     user: user.rows.length > 0 ? user.rows[0] : null
    // };
}
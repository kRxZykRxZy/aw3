import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';
import bcrypt from 'bcryptjs';

export const POST: RequestHandler = async (event) => {
	const { request } = event;
	const { username, password } = await request.json();
	if (!username || !password)
		return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });

	const user = await db
		.selectFrom('ampmodder')
		.selectAll()
		.where('username', '=', username)
		.executeTakeFirst();
	if (!user || !(await bcrypt.compare(password, user.password_hash)))
		return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

	const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const ssid = generateSessionToken();
	createSession(ssid, user.user_id); // create a session in the session table
	setSessionTokenCookie(event, ssid, newExpiry); // create a non-Http cookie
	return new Response(
		JSON.stringify({
			message: 'Login successful',
			apiToken: ssid,
			user: { id: user.user_id, username: user.username }
		}),
		{ status: 200 }
	);
};

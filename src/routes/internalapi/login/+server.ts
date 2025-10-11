import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { ampmodder } from '$lib/server/db/schema'; // use ampmodder table
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async (event) => {
	const { request } = event;
	const { username, password } = await request.json();

	if (!username || !password) {
		return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });
	}

	try {
		// Fetch user using Drizzle ORM
		const user = await db
			.select()
			.from(ampmodder)
			.where(eq(ampmodder.username, username))
			.limit(1)
			.then((rows) => rows[0]);

		if (!user || !(await bcrypt.compare(password, user.password_hash))) {
			return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
		}

		// Generate session token and set cookie
		const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
		const ssid = generateSessionToken();

		await createSession(ssid, user.user_id); // create session in DB
		setSessionTokenCookie(event, ssid, newExpiry); // set cookie in response

		return new Response(
			JSON.stringify({
				message: 'Login successful',
				apiToken: ssid,
				user: { id: user.user_id, username: user.username }
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ error: 'Internal server error. Bomboclaut.' }),
			{ status: 500 }
		);
	}
};

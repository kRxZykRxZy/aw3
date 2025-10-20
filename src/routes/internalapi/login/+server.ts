import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
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
		const data = await db.select().from(user).where(eq(user.username, username)).get();

		if (!data || !(await bcrypt.compare(password, data.passwordHash))) {
			return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
		}

		const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		const ssid = generateSessionToken();

		await createSession(ssid, data.id);
		setSessionTokenCookie(event, ssid, newExpiry);

		return new Response(
			JSON.stringify({
				message: 'Login successful',
				apiToken: ssid,
				user: data
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
	}
};

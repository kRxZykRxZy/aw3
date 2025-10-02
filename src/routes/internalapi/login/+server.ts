import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { generateSessionToken, createSession } from '$lib/server/auth';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json();
    if (!username || !password) return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });
    
        const user = await db.selectFrom('ampmodder').selectAll().where('username', '=', username).executeTakeFirst();
        if (!user || !(await bcrypt.compare(password, user.password_hash)))
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });

        const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const ssid = generateSessionToken();
        createSession(ssid, user.user_id);
        return new Response(JSON.stringify({ message: 'Login successful', apiToken: ssid, user: { id: user.user_id, username: user.username } }), { status: 200 });
};

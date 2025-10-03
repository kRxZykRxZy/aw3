import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
    const { username, password, bio, country } = await request.json();
    if (!username || !password) return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });

    const exists = await db.selectFrom('ampmodder').selectAll().where('username', '=', username).executeTakeFirst();
    if (exists) return new Response(JSON.stringify({ error: 'Username taken' }), { status: 409 });

    const count = (await db.selectFrom('ampmodder').select(db.fn.count('user_id').as('c')).executeTakeFirst())?.c ?? 0;
    const user_id = (count + 1).toString();
    const joined = new Date();
    const password_hash = await bcrypt.hash(password, 10);

    const userMETA = JSON.stringify({ id: parseInt(user_id), username, scratchteam: false, history: { joined: joined.toISOString() }, profile: { id: null, images: { "90x90":"", "60x60":"", "55x55":"", "50x50":"", "32x32":"" }, status:"coming soon...", bio: bio||"", country: country||"" } });

    await db.insertInto('ampmodder').values({ user_id, username, password_hash, bio: bio||null, joined, rank: 0, ghost: false, userMETA }).execute();

    return new Response(JSON.stringify({ message: 'Registration successful', user: { id: user_id, username } }), { status: 201 });
};

import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import bcrypt from 'bcryptjs';
import { eq, count } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { username, password, bio, country } = await request.json();
		if (!username || !password)
			return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });

		const existingUser = await db.select().from(user).where(eq(user.username, username)).get();
		if (existingUser)
			return new Response(JSON.stringify({ error: 'Username taken' }), { status: 409 });

		const user_id = uuid(); // generate unique ID
		const joined = new Date().toISOString();
		const passwordHash = await bcrypt.hash(password, 10);
		const userMETA = JSON.stringify({
			id: user_id,
			username,
			scratchteam: false,
			history: { joined },
			profile: {
				id: null,
				images: { '90x90': '', '60x60': '', '55x55': '', '50x50': '', '32x32': '' },
				status: 'coming soon...',
				bio: bio || '',
				country: country || ''
			}
		});

		await db.insert(user).values({
			id: user_id,
			username,
			passwordHash,
			bio: bio || null,
			joined,
			rank: 0,
			ghost: false,
			userMETA
		});

		return new Response(
			JSON.stringify({ message: 'Registration successful', user: { id: user_id, username } }),
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({
				error:
					'Internal Server Error. Please Refresh The Page To Try Again. If This Still Occurs Contact Us On <a href="mailto:ampelectrecuted@gmail.com">Our Email</a>'
			}),
			{ status: 500 }
		);
	}
};

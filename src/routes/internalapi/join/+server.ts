import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { ampmodder } from '$lib/server/schema';
import bcrypt from 'bcryptjs';
import { eq, count } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	try {
  		const { username, password, bio, country } = await request.json();
      if (!username || !password) return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });

      await db.execute(`CREATE TABLE IF NOT EXISTS ampmodder (
          user_id TEXT PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
      		password_hash TEXT NOT NULL,
     			bio TEXT,
          joined TIMESTAMP,
          rank INTEGER DEFAULT 1,
          ghost BOOLEAN DEFAULT FALSE,
          userMETA TEXT
      )`);

      const [exists] = await db.select().from(ampmodder).where(eq(ampmodder.username, username)).limit(1);
    	if (exists) return new Response(JSON.stringify({ error: 'Username taken' }), { status: 409 });

      const [countRow] = await db.select({ c: count(ampmodder.user_id) }).from(ampmodder);
      const user_id = ((countRow?.c ?? 0) + 1).toString();
      const joined = new Date();
      const password_hash = await bcrypt.hash(password, 10);
      const userMETA = JSON.stringify({id:parseInt(user_id),username,scratchteam:false,history:{joined:joined.toISOString()},profile:{id:null,images:{"90x90":"","60x60":"","55x55":"","50x50":"","32x32":""},status:"coming soon...",bio:bio||"",country:country||""}});

    	await db.insert(ampmodder).values({ user_id, username, password_hash, bio: bio||null, joined, rank: 0, ghost: false, userMETA });
  		return new Response(JSON.stringify({ message: 'Registration successful', user: { id: user_id, username } }), { status: 201 });
  } catch {
      return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
  };
                                                                                                            

import type { RequestHandler } from '@sveltejs/kit';
import type { db } from '$lib/server/db';

export const GET: RequestHandler = async () => {
    return new Response(JSON.stringify({ message: 'Hello World' }), {
        headers: { 'Content-Type': 'application/json' }
    });
};

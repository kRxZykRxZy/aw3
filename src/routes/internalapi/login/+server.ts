import type { RequestHandler } from '@sveltejs/kit';
import type { db } from '$lib/server/db';

export const GET: RequestHandler = async () => {
    return new Response(JSON.stringify({ message: 'Hello from internal API!' }), {
        headers: { 'Content-Type': 'application/json' }
    });
};
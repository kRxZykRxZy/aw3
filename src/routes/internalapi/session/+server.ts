import type { RequestHandler } from '@sveltejs/kit';
import { validateSessionToken } from '$lib/server/auth';

const ssid = localStorage.getItem('ssid');
export const GET: RequestHandler = async () => {
    if (ssid) {
        const data = await validateSessionToken(ssid);
        if (data.session) {
            return new Response(JSON.stringify(data)), {
            headers: { 'Content-Type': 'application/json' }
        };
        } else {
            return new Response(JSON.stringify({ error: 'Invalid Session Token' }), {
            headers: { 'Content-Type': 'application/json' }
        })}
    } else {
        return new Response(JSON.stringify({ error: 'No Session Available' }), {
        headers: { 'Content-Type': 'application/json' }
    });
    }
}
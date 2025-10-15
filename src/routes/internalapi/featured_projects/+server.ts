import type {
    RequestHandler
} from '@sveltejs/kit';
import {
    db
} from '$lib/server/db';
import * as t from '$lib/server/db/schema';

export const GET: RequestHandler = async() => {
    try {
        const r = await db.select({
            id: t.project.id,
            title: t.project.title,
            creator: t.project.creator,
            meta: t.project.projectMeta
        }).from(t.project);
        const j = r.map(p => {
            const m = p.meta || {},
                s = m.stats || {};
            return {
                id: p.id,
                title: p.title || 'Untitled Project',
                author: p.creator || m.author ? .username || 'Unknown',
                thumbnailUrl: m.image || m.images ? .['480x360'] || 'https://cdn2.scratch.mit.edu/get_image/project/1_270x210.png',
                score: (s.views ? ? 0) + (s.loves ? ? 0) + (s.favorites ? ? 0)
            }
        }).sort((a, b) => b.score - a.score).slice(0, 10).map(({
            id,
            title,
            author,
            thumbnailUrl
        }) => ({
            id,
            title,
            author,
            thumbnailUrl
        }));
        return new Response(JSON.stringify(j), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error'
        }), {
            status: 500
        });
    }
};
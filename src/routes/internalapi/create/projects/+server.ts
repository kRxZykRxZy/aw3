import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { validateSessionToken, sessionCookieName } from '$lib/server/session';
import { encodeBase64 } from '@oslojs/encoding';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
        const token = cookies.get(sessionCookieName);
        if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

        const { user } = await validateSessionToken(token);
        if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

        const sb3 = request.json();
        const now = new Date().toISOString();
        const projectMeta = { id: Math.floor(Math.random()*1e9), title:'Untitled Project', description:'', instructions:'', visibility:'visible', public:true, comments_allowed:true, is_published:true, author:{id:user.user_id, username:user.username, ampteam:false, history:{joined:user.joined.toISOString()}, profile:{id:null, images:{'90x90':'','60x60':'','55x55':'','50x50':'','32x32':''}}}, image:'', images:{}, history:{created:now, modified:now, shared:now}, stats:{views:0,loves:0,favorites:0,remixes:0}, remix:{parent:null, root:null}, project_token:crypto.randomUUID() };
        const projectId = crypto.randomUUID();
        await db.insert(table.project).values({ id:projectId, title:projectMeta.title, instructions:projectMeta.instructions, notes:projectMeta.description, creator:user.username, ghost:false, projectJson:sb3, projectMeta });

        return new Response(JSON.stringify({ message:'Project uploaded', project:{ id:projectId, title:projectMeta.title } }), { status:201 });
    } catch(e) {
        console.error(e);
        return new Response(JSON.stringify({ error:'Server error' }), { status:500 });
    }
};

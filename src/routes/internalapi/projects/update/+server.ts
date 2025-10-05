import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { validateSessionToken, sessionCookieName } from '$lib/server/session';

export const POST: RequestHandler = async ({ url, request, cookies }) => {
        try {
            const token = cookies.get(sessionCookieName);
            if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
            const { user } = await validateSessionToken(token);
            if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

            const projectJson = await request.json();
            const title = url.searchParams.get('title');
            const id = url.searchParams.get('pID');
            const existingProject = await db.select().from(table.project).where('id', '=', id).get();
            if (!existingProject) return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });

            const updatedMeta = { ...existingProject.projectMeta, history: { ...existingProject.projectMeta.history, modified: new Date().toISOString() } };
            await db.update(table.project).set({ projectJson, projectMeta: updatedMeta }).where('id', '=', existingProject.id).execute();

            return new Response(JSON.stringify({ message: 'Project updated', project: { id: existingProject.id, title } }), { status: 200 });
        } catch (e) {
            console.error(e);
            return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
        }
};
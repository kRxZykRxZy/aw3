import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const GET = async ({ params }) => {
    const project = await db.select().from(table.project).where('id', '=', params.id).get();
    return project
        ? Response.json(project.projectJson)
        : Response.json({ error: 'Project not found' }, { status: 404 });
};

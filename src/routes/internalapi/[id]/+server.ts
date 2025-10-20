import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET = async ({ params }) => {
	const project = await db
		.select()
		.from(table.project)
		.where(eq(table.project.id, params.id))
		.get();

	return project
		? Response.json(project.projectJson ? JSON.parse(project.projectJson) : {})
		: Response.json({ error: 'Project not found' }, { status: 404 });
};

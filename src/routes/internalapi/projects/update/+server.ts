import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { validateSessionToken, sessionCookieName } from '$lib/server/auth';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ url, request, cookies }) => {
	try {
		const token = cookies.get(sessionCookieName);
		if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

		const { user } = await validateSessionToken(token);
		if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

		const projectJson = await request.json();
		const title = url.searchParams.get('title') ?? '';
		const id = url.searchParams.get('pID');
		if (!id) return new Response(JSON.stringify({ error: 'Project ID required' }), { status: 400 });

		const existingProject = await db
			.select()
			.from(table.project)
			.where(eq(table.project.id, id))
			.get();

		if (!existingProject)
			return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });

		// Parse projectMeta from TEXT
		const projectMeta = existingProject.projectMeta ? JSON.parse(existingProject.projectMeta) : {};

		const updatedMeta = {
			...projectMeta,
			history: { ...(projectMeta.history || {}), modified: new Date().toISOString() }
		};

		await db
			.update(table.project)
			.set({ projectJson: JSON.stringify(projectJson), projectMeta: JSON.stringify(updatedMeta) })
			.where(eq(table.project.id, existingProject.id));

		return new Response(
			JSON.stringify({ message: 'Project updated', project: { id: existingProject.id, title } }),
			{ status: 200 }
		);
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
	}
};

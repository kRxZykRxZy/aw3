import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { validateSessionToken, sessionCookieName } from '$lib/server/auth';

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

		const existingProject = await prisma.project.findUnique({ where: { id } });
		if (!existingProject)
			return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });

		const projectMeta = existingProject.projectMeta ? JSON.parse(existingProject.projectMeta) : {};
		const updatedMeta = {
			...projectMeta,
			history: { ...(projectMeta.history || {}), modified: new Date().toISOString() }
		};

		await prisma.project.update({
			where: { id },
			data: {
				projectJson: JSON.stringify(projectJson),
				projectMeta: JSON.stringify(updatedMeta)
			}
		});

		return new Response(JSON.stringify({ message: 'Project updated', project: { id, title } }), {
			status: 200
		});
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
	}
};

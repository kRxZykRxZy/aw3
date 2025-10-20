import { prisma } from '$lib/server/db';

export const GET = async ({ params }) => {
	const project = await prisma.project.findUnique({
		where: { id: params.id },
		select: { projectMeta: true }
	});

	if (!project) {
		return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(project.projectMeta), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};

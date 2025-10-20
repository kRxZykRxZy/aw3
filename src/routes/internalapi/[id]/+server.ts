import { prisma } from '$lib/server/db';

export const GET = async ({ params }) => {
	const project = await prisma.project.findUnique({
		where: { id: params.id }
	});

	if (!project) {
		return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(project.projectJson ? JSON.parse(project.projectJson) : {}), {
		status: 200
	});
};

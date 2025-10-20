import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async () => {
	try {
		// Fetch all projects with selected fields
		const projects = await prisma.project.findMany({
			select: {
				id: true,
				title: true,
				creator: true,
				projectMeta: true
			}
		});

		// Transform projects: parse metadata, compute score, determine thumbnail
		const transformedProjects = projects.map((project) => {
			let metadata: any = {};
			try {
				metadata = project.projectMeta ? JSON.parse(project.projectMeta) : {};
			} catch {
				metadata = {};
			}

			const stats = metadata.stats || {};

			return {
				id: project.id,
				title: project.title || 'Untitled Project',
				author: project.creator || metadata.author?.username || 'Unknown',
				thumbnailUrl:
					metadata.image ||
					metadata.images?.['480x360'] ||
					'https://cdn2.scratch.mit.edu/get_image/project/1_270x210.png',
				score: (stats.views ?? 0) + (stats.loves ?? 0) + (stats.favorites ?? 0)
			};
		});

		// Sort by score descending
		const sortedProjects = transformedProjects.sort((a, b) => b.score - a.score);

		// Take top 10
		const topProjects = sortedProjects.slice(0, 10);

		// Map to response format
		const responseProjects = topProjects.map((project) => ({
			id: project.id,
			title: project.title,
			author: project.author,
			thumbnailUrl: project.thumbnailUrl
		}));

		return new Response(JSON.stringify(responseProjects), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching projects:', error);

		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

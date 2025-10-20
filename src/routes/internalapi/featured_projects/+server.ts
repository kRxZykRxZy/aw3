import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as t from '$lib/server/db/schema';

export const GET: RequestHandler = async () => {
	try {
		const projects = await db
			.select({
				id: t.project.id,
				title: t.project.title,
				creator: t.project.creator,
				meta: t.project.projectMeta
			})
			.from(t.project);

		const transformedProjects = projects.map((project) => {
			let metadata: any = {};
			try {
				metadata = project.meta ? JSON.parse(project.meta) : {};
			} catch {
				metadata = {};
			}

			const stats = metadata.stats || {};

			const transformedProject = {
				id: project.id,
				title: project.title || 'Untitled Project',
				author: project.creator || metadata.author?.username || 'Unknown',
				thumbnailUrl:
					metadata.image ||
					metadata.images?.['480x360'] ||
					'https://cdn2.scratch.mit.edu/get_image/project/1_270x210.png',
				score: (stats.views ?? 0) + (stats.loves ?? 0) + (stats.favorites ?? 0)
			};

			return transformedProject;
		});

		const sortedProjects = transformedProjects.sort((a, b) => b.score - a.score);

		const topProjects = sortedProjects.slice(0, 10);

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

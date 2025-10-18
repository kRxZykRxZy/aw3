import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as t from '$lib/server/db/schema';

export const GET: RequestHandler = async () => {
	try {
		// Fetch projects from the database
		const projects = await db
			.select({
				id: t.project.id,
				title: t.project.title,
				creator: t.project.creator,
				meta: t.project.projectMeta
			})
			.from(t.project);

		// Transform the projects for API response
		const transformedProjects = projects.map((project) => {
			// Extract project metadata safely
			const metadata = project.meta || {};
			const stats = metadata.stats || {};

			// Build a transformed project object
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

		// Sort projects by score descending
		const sortedProjects = transformedProjects.sort((a, b) => b.score - a.score);

		// Take top 10 projects
		const topProjects = sortedProjects.slice(0, 10);

		// Map to final response shape (exclude score)
		const responseProjects = topProjects.map((project) => {
			return {
				id: project.id,
				title: project.title,
				author: project.author,
				thumbnailUrl: project.thumbnailUrl
			};
		});

		// Return the JSON response
		return new Response(JSON.stringify(responseProjects), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		// Log the error and return 500
		console.error('Error fetching projects:', error);

		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};

import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { validateSessionToken, sessionCookieName } from '$lib/server/auth';

export const POST: RequestHandler = async ({ url, request, cookies }) => {
	try {
		const token = cookies.get(sessionCookieName);
		if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

		const { user } = await validateSessionToken(token);
		if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

		const sb3 = await request.json();
		const now = new Date().toISOString();
		const title = url.searchParams.get('title') ?? 'Untitled Project';
		const joined = typeof user.joined === 'string' ? user.joined : user.joined.toISOString();

		const projectMeta = {
			id: Math.floor(Math.random() * 1e9),
			title,
			description: '',
			instructions: '',
			visibility: 'visible',
			public: true,
			comments_allowed: true,
			is_published: true,
			username: user.username,
			author: {
				id: user.id,
				username: user.username,
				ampteam: false,
				history: { joined },
				profile: {
					id: null,
					images: { '90x90': '', '60x60': '', '55x55': '', '50x50': '', '32x32': '' }
				}
			},
			image: '',
			images: {},
			history: { created: now, modified: now, shared: now },
			stats: { views: 0, loves: 0, favorites: 0, remixes: 0 },
			remix: { parent: null, root: null },
			project_token: crypto.randomUUID()
		};

		const projectId = crypto.randomUUID();

		await prisma.project.create({
			data: {
				id: projectId,
				title: projectMeta.title,
				instructions: projectMeta.instructions,
				notes: projectMeta.description,
				creatorId: user.id, // Use user ID for relation
				ghost: false,
				projectJson: JSON.stringify(sb3),
				projectMeta: JSON.stringify(projectMeta)
			}
		});

		return new Response(
			JSON.stringify({
				message: 'Project uploaded',
				project: { id: projectId, title: projectMeta.title }
			}),
			{ status: 201 }
		);
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
	}
};

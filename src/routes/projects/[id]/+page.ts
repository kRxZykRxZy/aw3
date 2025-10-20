import type { Comment, Project } from '$lib/projects/index.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const res = await fetch(
		`https://ampmod.vercel.app/internalapi/projects/${encodeURIComponent(params.id)}`
	);
	const res2 = await fetch(
		`https://ampmod.vercel.app/internalapi/projects/${encodeURIComponent(params.id)}/comments`
	);
	if (!res.ok || !res2.ok) error(404);
	const project = (await res.json()) as Project;
	const commentsObject = (await res2.json()) as { [key: string]: Comment };
	let comments: Comment[] = [];
	for (let key of Object.keys(commentsObject)) {
		comments.unshift(commentsObject[key]);
	}
	return {
		...project,
		comments: comments
	};
};

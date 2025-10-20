import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { validateSessionToken, sessionCookieName } from '$lib/server/auth';
import fs from 'fs/promises';
import path from 'path';
import AdmZip from 'adm-zip';

const ROOT_DIR = path.resolve('prisma/internal');
const FILES_DIR = path.join(ROOT_DIR, 'files');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');
const PROJECTS_DIR = path.join(ROOT_DIR, 'projects');

async function ensureDir(dir: string) {
	await fs.mkdir(dir, { recursive: true });
}

export const POST: RequestHandler = async ({ request, url, cookies }) => {
	try {
		const token = cookies.get(sessionCookieName);
		if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

		const { user } = await validateSessionToken(token);
		if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

		const projectId = url.searchParams.get('pID');
		if (!projectId)
			return new Response(JSON.stringify({ error: 'Project ID required' }), { status: 400 });

		const existingProject = await prisma.project.findUnique({ where: { id: projectId } });
		if (!existingProject)
			return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });

		// Ensure directories exist
		await ensureDir(FILES_DIR);
		await ensureDir(ASSETS_DIR);
		await ensureDir(PROJECTS_DIR);

		const formData = await request.formData();
		const files = formData.getAll('files') as File[];
		if (!files.length)
			return new Response(JSON.stringify({ error: 'No files uploaded' }), { status: 400 });

		const apzFile = files.find((f) => f.name.endsWith('.apz'));
		if (!apzFile)
			return new Response(JSON.stringify({ error: 'No .apz file found' }), { status: 400 });

		// Read .apz file into buffer
		const arrayBuffer = await apzFile.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const zip = new AdmZip(buffer);
		const zipEntries = zip.getEntries();

		// Get project.json and remove it from zip
		const projectJsonEntry = zipEntries.find((e) => e.entryName === 'project.json');
		if (!projectJsonEntry)
			return new Response(JSON.stringify({ error: 'project.json not found in .apz' }), {
				status: 400
			});

		zip.deleteFile('project.json');
		const projectJson = projectJsonEntry.getData().toString('utf-8');

		// Overwrite remaining assets
		for (const entry of zip.getEntries()) {
			if (!entry.isDirectory) {
				const filePath = path.join(ASSETS_DIR, entry.entryName);
				await ensureDir(path.dirname(filePath));
				await fs.writeFile(filePath, entry.getData());
			}
		}

		// Overwrite project JSON
		const projectJsonPath = path.join(PROJECTS_DIR, `${projectId}.json`);
		await fs.writeFile(projectJsonPath, projectJson, 'utf-8');

		// Update DB
		const projectMeta = existingProject.projectMeta ? JSON.parse(existingProject.projectMeta) : {};
		const updatedMeta = {
			...projectMeta,
			history: { ...(projectMeta.history || {}), modified: new Date().toISOString() }
		};

		await prisma.project.update({
			where: { id: projectId },
			data: {
				projectJson,
				projectMeta: JSON.stringify(updatedMeta)
			}
		});

		return new Response(
			JSON.stringify({
				message: 'Project updated',
				project: { id: projectId, title: existingProject.title }
			}),
			{ status: 200 }
		);
	} catch (e) {
		console.error(e);
		return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
	}
};

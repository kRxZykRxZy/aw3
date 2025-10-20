import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { validateSessionToken, sessionCookieName } from '$lib/server/auth';
import fs from 'fs/promises';
import path from 'path';
import AdmZip from 'adm-zip';
import { v4 as uuidv4 } from 'uuid';

const ROOT_DIR = path.resolve('prisma/internal');
const FILES_DIR = path.join(ROOT_DIR, 'files');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');
const PROJECTS_DIR = path.join(ROOT_DIR, 'projects');

async function ensureDir(dir: string) {
    await fs.mkdir(dir, { recursive: true });
}

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const token = cookies.get(sessionCookieName);
        if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

        const { user } = await validateSessionToken(token);
        if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

        // Ensure directories exist
        await ensureDir(FILES_DIR);
        await ensureDir(ASSETS_DIR);
        await ensureDir(PROJECTS_DIR);

        const formData = await request.formData();
        const files = formData.getAll('files') as File[];
        if (!files.length) return new Response(JSON.stringify({ error: 'No files uploaded' }), { status: 400 });

        for (const file of files) {
            if (!file.name.endsWith('.apz')) continue;

            // Read file into buffer
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const zip = new AdmZip(buffer);
            const zipEntries = zip.getEntries();

            // Remove project.json
            const projectJsonEntry = zipEntries.find(e => e.entryName === 'project.json');
            if (!projectJsonEntry) return new Response(JSON.stringify({ error: 'project.json not found' }), { status: 400 });

            zip.deleteFile('project.json');

            // Determine new project ID
            const projectCount = await prisma.project.count();
            const projectId = (projectCount + 1).toString();

            // Rename project.json to ID.json
            const projectJson = projectJsonEntry.getData().toString('utf-8');
            const projectJsonPath = path.join(PROJECTS_DIR, `${projectId}.json`);
            await fs.writeFile(projectJsonPath, projectJson, 'utf-8');

            // Save remaining files to assets
            for (const entry of zip.getEntries()) {
                if (!entry.isDirectory) {
                    const filePath = path.join(ASSETS_DIR, entry.entryName);
                    await ensureDir(path.dirname(filePath));
                    await fs.writeFile(filePath, entry.getData());
                }
            }

            // Create project record in DB
            await prisma.project.create({
                data: {
                    id: projectId,
                    title: path.basename(file.name, '.apz'),
                    creatorId: user.id,
                    ghost: false,
                    projectJson: projectJson,
                    projectMeta: JSON.stringify({ id: projectId })
                }
            });
        }

        return new Response(JSON.stringify({ message: 'Project(s) uploaded successfully' }), { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
};

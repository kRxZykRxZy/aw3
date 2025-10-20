import fs from 'fs';
import path from 'path';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const filePath = path.resolve(`prisma/internal/assets/${params.md5}`);

    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: 'File not found' }), { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const ext = path.extname(filePath).toLowerCase();

    const mimeTypes: Record<string, string> = {
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.txt': 'text/plain',
      '.mp3': 'audio/mpeg',
      '.svg': 'image/svg+xml'
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`
      }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};

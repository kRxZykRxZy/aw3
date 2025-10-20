import { defineConfig } from 'drizzle-kit';
import path from 'path';

const DATABASE_FILE = path.join(process.cwd(), 'internal', 'db', 'files.db');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: `file:${DATABASE_FILE}`
	},
	verbose: true,
	strict: true
});

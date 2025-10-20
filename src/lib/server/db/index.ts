import { drizzle } from 'drizzle-orm/sqlite';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

const dbFile = path.join(process.cwd(), 'internal', 'db', 'files.db');
const client = new Database(dbFile);

export const db = drizzle(client, { schema });

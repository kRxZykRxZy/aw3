import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(
	`postgres://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@${env.DATABASE_URL}/${env.DATABASE_NAME}`
);

export const db = drizzle(client, { schema });

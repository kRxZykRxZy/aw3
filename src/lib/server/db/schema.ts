import { sqliteTable, integer, text, integer as booleanInt } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('ampmodder', {
	id: text('user_id').primaryKey(),
	username: text('username').notNull(),
	joined: text('joined')
		.default(sqliteTable.sql`CURRENT_TIMESTAMP`)
		.notNull(),
	rank: integer('rank').default(0),
	bio: text('bio'),
	status: text('status'),
	passwordHash: text('password_hash').notNull(),
	banned: booleanInt('banned').default(0),
	bannedType: text('bannedType').default('temporary'),
	bannedReason: text('bannedReason').default('You have been banned for breaking the guidelines.'),
	bannedExpiry: text('bannedExpiry')
		.default(sqliteTable.sql`CURRENT_TIMESTAMP`)
		.notNull(),
	ghost: booleanInt('ghost').default(0),
	userMETA: text('userMETA')
});

export const project = sqliteTable('project', {
	id: text('id').primaryKey(),
	title: text('title'),
	created: text('created')
		.default(sqliteTable.sql`CURRENT_TIMESTAMP`)
		.notNull(),
	instructions: text('instructions'),
	notes: text('notes'),
	creator: text('creator')
		.notNull()
		.references(() => user.id),
	ghost: booleanInt('ghost').default(1),
	projectJson: text('projectJson'),
	projectMeta: text('projectMeta')
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: text('expires_at').notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Project = typeof project.$inferSelect;

import { pgTable, serial, text, integer, boolean, timestamp, unique, primaryKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: text('username').unique().notNull(),
	passkeyHash: text('passkeyHash').notNull(),
	birthdate: timestamp('birthdate', { precision: 6 }).notNull(),
	isAdmin: boolean('isAdmin').default(false).notNull()
});

// export type InsertUser = typeof users.$inferInsert;
// export type SelectUser = typeof users.$inferSelect;

export const sessions = pgTable('sessions', {
	id: serial('id').primaryKey(),
	token: text('token').unique().notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	userId: integer('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }) // SQ: need this cascade? users won't be deleted
});

// export type InsertSessions = typeof sessions.$inferInsert;
// export type SelectSessions = typeof sessions.$inferSelect;

export const wishes = pgTable('wishes', {
	id: serial('id').primaryKey(),
	name: text('name').unique().notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	url: text('url').notNull(),
	rating: integer('rating').notNull(),
	comment: text('comment').notNull(),
	userId: integer('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
});

// export type InsertWish = typeof wishes.$inferInsert;
// export type SelectWish = typeof wishes.$inferSelect;

export const exchanges = pgTable('exchanges', {
	id: serial('id').primaryKey(),
	year: integer('year').notNull(),
	present: text('present').notNull(),
	santaId: integer('santaId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	recipientId: integer('recipientId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
});

// export type InsertExchange = typeof exchanges.$inferInsert;
// export type SelectExchange = typeof exchanges.$inferSelect;

export const chats = pgTable('chats', {
	id: serial('id').primaryKey(),
	santaId: integer('santaId')
		.unique()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	recipientId: integer('recipientId')
		.unique()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
});

// export type InsertChat = typeof chats.$inferInsert;
// export type SelectChat = typeof chats.$inferSelect;

export const messages = pgTable('messages', {
	id: serial('id').primaryKey(),
	chatId: integer('chatId')
		.notNull()
		.references(() => chats.id, { onDelete: 'cascade' }),
	senderId: integer('senderId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	content: text('content').notNull(),
	timestamp: timestamp('timestamp').defaultNow().notNull()
});

// export type InsertMessage = typeof messages.$inferInsert;
// export type SelectMessage = typeof messages.$inferSelect;

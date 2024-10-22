import { pgTable, serial, text, jsonb, unique, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  settings: jsonb('settings'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const epithets = pgTable('epithets', {
  id: serial('id').primaryKey(),
  epithet: text('epithet').unique().notNull(),
  source: text('source').default('custom'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const names = pgTable('names', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  source: text('source').default('custom'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
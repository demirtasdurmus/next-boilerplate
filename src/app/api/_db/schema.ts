import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const examples = pgTable('examples', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
});

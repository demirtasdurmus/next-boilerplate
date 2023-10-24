import { boolean, date, jsonb, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const examples = pgTable('examples', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
});

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  roles: jsonb('roles').notNull().default(`["${Role.USER}"]`).$type<Role[]>(),
  isVerified: boolean('is_verified').notNull().default(false),
  verificationToken: text('verification_token'),
  verificationTokenExpiresAt: date('verification_token_expires_at'),
  createdAt: date('created_at').notNull().default('now()'),
  updatedAt: date('updated_at').notNull().default('now()'),
});

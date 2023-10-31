import { relations } from 'drizzle-orm';
import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// types
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

// tables
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  roles: jsonb('roles').notNull().default(`["${Role.USER}"]`).$type<Role[]>(),
  profileImageUrl: text('profile_image_url'),
  isVerified: boolean('is_verified').notNull().default(false),
  verificationToken: text('verification_token'),
  verificationTokenExpiresAt: timestamp('verification_token_expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const examples = pgTable('examples', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
});

// relations
export const userRelations = relations(users, ({ many }) => ({
  examples: many(examples),
}));

export const exampleRelations = relations(examples, ({ one }) => ({
  user: one(users),
}));

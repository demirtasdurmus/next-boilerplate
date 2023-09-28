CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" jsonb DEFAULT '["USER"]' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

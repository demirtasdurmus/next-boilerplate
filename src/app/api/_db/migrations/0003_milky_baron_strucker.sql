ALTER TABLE "users" ADD COLUMN "is_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verification_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verification_token_expires_at" date;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" date DEFAULT 'now()' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" date DEFAULT 'now()' NOT NULL;
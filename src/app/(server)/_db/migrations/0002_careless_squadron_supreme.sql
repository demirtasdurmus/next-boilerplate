ALTER TABLE "examples" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "examples" ADD CONSTRAINT "examples_slug_unique" UNIQUE("slug");
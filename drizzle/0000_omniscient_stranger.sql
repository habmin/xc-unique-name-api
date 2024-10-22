CREATE TABLE IF NOT EXISTS "epithets" (
	"id" serial PRIMARY KEY NOT NULL,
	"epithet" text NOT NULL,
	"source" text DEFAULT 'custom',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "epithets_epithet_unique" UNIQUE("epithet")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "names" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"source" text DEFAULT 'custom',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "names_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"settings" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

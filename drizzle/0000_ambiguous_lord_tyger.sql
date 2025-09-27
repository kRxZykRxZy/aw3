CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(500),
	"created" timestamp DEFAULT now() NOT NULL,
	"instructions" text,
	"notes" text,
	"creator" text NOT NULL,
	"ghost" boolean DEFAULT true,
	"projectMETA" json, 
	"projectJSON" json
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ampmodder" (
	"user_id" text PRIMARY KEY NOT NULL,
	"username" varchar(20) NOT NULL,
	"joined" timestamp DEFAULT now() NOT NULL,
	"rank" smallint DEFAULT 0,
	"bio" text,
	"status" text,
	"password_hash" text NOT NULL,
	"banned" boolean DEFAULT false,
	"bannedType" text DEFAULT 'temporary',
	"bannedReason" text DEFAULT 'You have been banned for breaking the guidelines.',
	"bannedExpiry" timestamp DEFAULT now() NOT NULL,
	"ghost" boolean DEFAULT false,
	CONSTRAINT "ampmodder_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_creator_ampmodder_user_id_fk" FOREIGN KEY ("creator") REFERENCES "public"."ampmodder"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_ampmodder_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ampmodder"("user_id") ON DELETE no action ON UPDATE no action;
ALTER TYPE "public"."offer_status" RENAME TO "mod_status";--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"offer_id" integer NOT NULL,
	"rating" numeric(2, 1) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"mod_status" "mod_status" DEFAULT 'PENDING' NOT NULL,
	"mod_by" integer,
	"mod_at" timestamp,
	"mod_reason" text
);
--> statement-breakpoint
ALTER TABLE "offers" RENAME COLUMN "status" TO "mod_status";--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "mod_by" integer;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "mod_at" timestamp;--> statement-breakpoint
ALTER TABLE "offers" ADD COLUMN "mod_reason" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "mod_status" "mod_status" DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "mod_by" integer;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "mod_at" timestamp;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "mod_reason" text;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "is_approved";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "approved_at";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "approved_by";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "rejected_at";--> statement-breakpoint
ALTER TABLE "offers" DROP COLUMN "rejected_by";--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_user_id_unique" UNIQUE("user_id");
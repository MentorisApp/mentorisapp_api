CREATE TYPE "public"."offer_format" AS ENUM('UZIVO', 'ONLINE', 'OBOJE');--> statement-breakpoint
CREATE TYPE "public"."offer_level" AS ENUM('OSNOVNA', 'SREDNJA', 'FAKULTET', 'MATURA');--> statement-breakpoint
CREATE TYPE "public"."offer_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."price_type" AS ENUM('FIXED', 'RANGE');--> statement-breakpoint
CREATE TABLE "offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price_type" "price_type" NOT NULL,
	"price" numeric(10, 2),
	"price_from" numeric(10, 2),
	"price_to" numeric(10, 2),
	"level" "offer_level" NOT NULL,
	"format" "offer_format" NOT NULL,
	"status" "offer_status" DEFAULT 'PENDING' NOT NULL,
	"is_approved" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"approved_at" timestamp,
	"approved_by" integer,
	"rejected_at" timestamp,
	"rejected_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "verification_tokens" ALTER COLUMN "context" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."verification_token_context";--> statement-breakpoint
CREATE TYPE "public"."verification_token_context" AS ENUM('EMAIL_VERIFICATION', 'PASSWORD_RESET');--> statement-breakpoint
ALTER TABLE "verification_tokens" ALTER COLUMN "context" SET DATA TYPE "public"."verification_token_context" USING "context"::"public"."verification_token_context";--> statement-breakpoint
ALTER TABLE "verification_tokens" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verification_tokens" ALTER COLUMN "context" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "verification_tokens" ALTER COLUMN "created_at" SET NOT NULL;
ALTER TABLE "users" ADD COLUMN "isVerified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_token_unique" UNIQUE("token");
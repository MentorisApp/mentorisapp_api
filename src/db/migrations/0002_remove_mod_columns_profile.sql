ALTER TABLE "users" ALTER COLUMN "isVerified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "mod_status";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "mod_by";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "mod_at";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "mod_reason";
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_phone_unique";--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id");
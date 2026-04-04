ALTER TABLE "countries" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "countries" CASCADE;--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_country_id_countries_id_fk";
--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "home_address";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "country_id";
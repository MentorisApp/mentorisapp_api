ALTER TABLE "profiles" DROP CONSTRAINT "profiles_education_level_id_education_levels_id_fk";
--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_gender_id_genders_id_fk";
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "dob" date;--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "age";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "education_level_id";--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN "gender_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "name";
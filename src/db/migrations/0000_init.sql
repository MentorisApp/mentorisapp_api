CREATE TYPE "public"."mod_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."verification_token_context" AS ENUM('email_verification', 'password_reset');--> statement-breakpoint
CREATE TABLE "offers_offer_categories" (
	"offer_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "offers_offer_categories_offer_id_category_id_pk" PRIMARY KEY("offer_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "offers_offer_formats" (
	"offer_id" integer NOT NULL,
	"offer_format_id" integer NOT NULL,
	CONSTRAINT "offers_offer_formats_offer_id_offer_format_id_pk" PRIMARY KEY("offer_id","offer_format_id")
);
--> statement-breakpoint
CREATE TABLE "offers_offer_levels" (
	"offer_id" integer NOT NULL,
	"offer_level_id" integer NOT NULL,
	CONSTRAINT "offers_offer_levels_offer_id_offer_level_id_pk" PRIMARY KEY("offer_id","offer_level_id")
);
--> statement-breakpoint
CREATE TABLE "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"label" varchar(50) NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cities_code_unique" UNIQUE("code"),
	CONSTRAINT "cities_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "genders" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"label" varchar(50) NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "genders_code_unique" UNIQUE("code"),
	CONSTRAINT "genders_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "offer_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"label" varchar(50) NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "offer_categories_code_unique" UNIQUE("code"),
	CONSTRAINT "offer_categories_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "offer_formats" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"label" varchar(50) NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "offer_formats_code_unique" UNIQUE("code"),
	CONSTRAINT "offer_formats_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "offer_levels" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"label" varchar(50) NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "offer_levels_code_unique" UNIQUE("code"),
	CONSTRAINT "offer_levels_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"label" varchar(50) NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_roles_code_unique" UNIQUE("code"),
	CONSTRAINT "user_roles_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "offer_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"offer_id" integer NOT NULL,
	"rating" numeric(2, 1) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"mod_status" "mod_status" DEFAULT 'PENDING' NOT NULL,
	"mod_by" integer,
	"mod_at" timestamp with time zone,
	"mod_reason" text
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"user_id" integer NOT NULL,
	"price_from_cents" integer,
	"price_to_cents" integer,
	"mod_status" "mod_status" DEFAULT 'PENDING' NOT NULL,
	"mod_by" integer,
	"mod_at" timestamp with time zone,
	"mod_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "offers_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_picture_url" varchar(255),
	"name" varchar(255) NOT NULL,
	"bio" text,
	"dob" date,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"jti" varchar(36) NOT NULL,
	"user_id" integer NOT NULL,
	"revoked" boolean DEFAULT false NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "refresh_tokens_jti_unique" UNIQUE("jti")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role_id" integer NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"context" "verification_token_context",
	"token" text NOT NULL,
	"used" boolean DEFAULT false,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "verification_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "offers_offer_categories" ADD CONSTRAINT "offers_offer_categories_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers_offer_categories" ADD CONSTRAINT "offers_offer_categories_category_id_offer_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."offer_categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers_offer_formats" ADD CONSTRAINT "offers_offer_formats_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers_offer_formats" ADD CONSTRAINT "offers_offer_formats_offer_format_id_offer_formats_id_fk" FOREIGN KEY ("offer_format_id") REFERENCES "public"."offer_formats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers_offer_levels" ADD CONSTRAINT "offers_offer_levels_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers_offer_levels" ADD CONSTRAINT "offers_offer_levels_offer_level_id_offer_levels_id_fk" FOREIGN KEY ("offer_level_id") REFERENCES "public"."offer_levels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offer_reviews" ADD CONSTRAINT "offer_reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offer_reviews" ADD CONSTRAINT "offer_reviews_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_user_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."user_roles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
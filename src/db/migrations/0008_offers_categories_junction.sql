CREATE TABLE "offers_categories" (
	"category_id" integer NOT NULL,
	"offer_id" integer NOT NULL,
	CONSTRAINT "offers_categories_category_id_offer_id_pk" PRIMARY KEY("category_id","offer_id")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "offers_categories" ADD CONSTRAINT "offers_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers_categories" ADD CONSTRAINT "offers_categories_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "offers_offer_categories" RENAME COLUMN "category_id" TO "offer_category_id";--> statement-breakpoint
ALTER TABLE "offers_offer_categories" DROP CONSTRAINT "offers_offer_categories_category_id_offer_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "offers_offer_categories" DROP CONSTRAINT "offers_offer_categories_offer_id_category_id_pk";--> statement-breakpoint
ALTER TABLE "offers_offer_categories" ADD CONSTRAINT "offers_offer_categories_offer_id_offer_category_id_pk" PRIMARY KEY("offer_id","offer_category_id");--> statement-breakpoint
ALTER TABLE "offers_offer_categories" ADD CONSTRAINT "offers_offer_categories_offer_category_id_offer_categories_id_fk" FOREIGN KEY ("offer_category_id") REFERENCES "public"."offer_categories"("id") ON DELETE cascade ON UPDATE no action;
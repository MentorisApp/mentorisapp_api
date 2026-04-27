import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { offerCategories } from "../tables/dictionary/offer-categories.table";
import { offers } from "../tables/offers.table";

export const offersOfferCategories = pgTable(
	"offers_offer_categories",
	{
		offer_id: integer("offer_id")
			.notNull()
			.references(() => offers.id, { onDelete: "cascade" }),
		offer_category_id: integer("offer_category_id")
			.notNull()
			.references(() => offerCategories.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ columns: [table.offer_id, table.offer_category_id] })],
);

export const offersOfferCategoriesRelations = relations(offersOfferCategories, ({ one }) => ({
	offer: one(offers, {
		fields: [offersOfferCategories.offer_id],
		references: [offers.id],
	}),
	offerCategory: one(offerCategories, {
		fields: [offersOfferCategories.offer_category_id],
		references: [offerCategories.id],
	}),
}));

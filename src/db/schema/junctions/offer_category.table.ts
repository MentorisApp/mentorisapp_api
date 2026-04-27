import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { offer_category } from "../tables/dictionary/category.table";
import { offers } from "../tables/offer.table";

export const offers_categories = pgTable(
	"offers_categories",
	{
		categoryId: integer("category_id")
			.notNull()
			.references(() => offer_category.id, { onDelete: "cascade" }),
		offerId: integer("offer_id")
			.notNull()
			.references(() => offers.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ columns: [table.categoryId, table.offerId] })],
);

export const offersCategoriesRelations = relations(offers_categories, ({ one }) => ({
	offer: one(offers, {
		fields: [offers_categories.offerId],
		references: [offers.id],
	}),
	category: one(offer_category, {
		fields: [offers_categories.categoryId],
		references: [offer_category.id],
	}),
}));

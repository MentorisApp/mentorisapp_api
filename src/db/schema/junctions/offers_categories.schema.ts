import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { categories } from "../tables/categories.schema";
import { offers } from "../tables/offers.schema";

export const offers_categories = pgTable(
	"offers_categories",
	{
		categoryId: integer("category_id")
			.notNull()
			.references(() => categories.id, { onDelete: "cascade" }),
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
	category: one(categories, {
		fields: [offers_categories.categoryId],
		references: [categories.id],
	}),
}));

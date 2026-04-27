import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { offersOfferCategories } from "../../junctions/offers-offer-categories.table";
import { timestampColumns } from "../../partials/timestampColumns";

export const offerCategories = pgTable("offer_categories", {
	id: serial("id").primaryKey(),
	code: varchar("code", { length: 50 }).notNull().unique(),
	label: varchar("label", { length: 50 }).notNull().unique(),
	active: boolean("active").default(true),
	...timestampColumns,
});

export const offerCategoriesRelations = relations(offerCategories, ({ many }) => ({
	offersOfferCategories: many(offersOfferCategories),
}));

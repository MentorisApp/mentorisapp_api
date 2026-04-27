import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { offers_categories } from "../../junctions/offer_category.table";
import { dictionaryColumns } from "../../partials/dictionaryColumns";

export const offer_category = pgTable("categories", dictionaryColumns);

export const offerCategoryRelations = relations(offer_category, ({ many }) => ({
	offerCategories: many(offers_categories),
}));

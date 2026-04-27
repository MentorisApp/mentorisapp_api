import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { offersOfferCategories } from "../../junctions/offers-offer-categories.table";
import { dictionaryColumns } from "../../partials/dictionaryColumns";

export const offerCategories = pgTable("offer_categories", dictionaryColumns);

export const offerCategoriesRelations = relations(offerCategories, ({ many }) => ({
	offersOfferCategories: many(offersOfferCategories),
}));

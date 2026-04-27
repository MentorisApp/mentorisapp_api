import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { offersOfferLevels } from "../../junctions/offers-offer-levels.table";
import { dictionaryColumns } from "../../partials/dictionaryColumns";

export const offerLevels = pgTable("offer_levels", dictionaryColumns);

export const offerLevelsRelations = relations(offerLevels, ({ many }) => ({
	offersOfferLevels: many(offersOfferLevels),
}));

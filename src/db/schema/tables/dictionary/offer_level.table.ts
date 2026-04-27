import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { offer_offer_level } from "../../junctions/offer_offer_level.table";
import { dictionaryColumns } from "../../partials/dictionaryColumns";

export const offer_level = pgTable("offer_levels", dictionaryColumns);

export const offerLevelRelations = relations(offer_level, ({ many }) => ({
	offerLevels: many(offer_offer_level),
}));

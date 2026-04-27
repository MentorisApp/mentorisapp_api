import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { offersOfferFormats } from "../../junctions/offers-offer-formats.table";
import { dictionaryColumns } from "../../partials/dictionaryColumns";

export const offerFormats = pgTable("offer_formats", dictionaryColumns);

export const offerFormatsRelations = relations(offerFormats, ({ many }) => ({
	offersOfferFormats: many(offersOfferFormats),
}));

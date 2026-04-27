import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { offer_offer_format } from "../../junctions/offer_offer_format.table";
import { dictionaryColumns } from "../../partials/dictionaryColumns";

export const offer_format = pgTable("offer_formats", dictionaryColumns);

export const offerFormatRelations = relations(offer_format, ({ many }) => ({
	offerFormats: many(offer_offer_format),
}));

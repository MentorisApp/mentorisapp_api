import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { offersOfferFormats } from "../../junctions/offers-offer-formats.table";
import { timestampColumns } from "../../partials/timestampColumns";

export const offerFormats = pgTable("offer_formats", {
	id: serial("id").primaryKey(),
	code: varchar("code", { length: 50 }).notNull().unique(),
	label: varchar("label", { length: 50 }).notNull().unique(),
	active: boolean("active").default(true),
	...timestampColumns,
});

export const offerFormatsRelations = relations(offerFormats, ({ many }) => ({
	offersOfferFormats: many(offersOfferFormats),
}));

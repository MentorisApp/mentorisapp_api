import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { offerFormats } from "../tables/dictionary/offer-formats.table";
import { offers } from "../tables/offers.table";

export const offersOfferFormats = pgTable(
	"offers_offer_formats",
	{
		offer_id: integer("offer_id")
			.notNull()
			.references(() => offers.id, { onDelete: "cascade" }),

		offer_format_id: integer("offer_format_id")
			.notNull()
			.references(() => offerFormats.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ columns: [table.offer_id, table.offer_format_id] })],
);

export const offersOfferFormatsRelations = relations(offersOfferFormats, ({ one }) => ({
	offer: one(offers, {
		fields: [offersOfferFormats.offer_id],
		references: [offers.id],
	}),
	offerFormat: one(offerFormats, {
		fields: [offersOfferFormats.offer_format_id],
		references: [offerFormats.id],
	}),
}));

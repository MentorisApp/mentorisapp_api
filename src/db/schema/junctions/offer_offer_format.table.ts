import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { offer_format } from "../tables/dictionary/offer_format.table";
import { offers } from "../tables/offer.table";

export const offer_offer_format = pgTable(
	"offers_offer_formats",
	{
		offerId: integer("offer_id")
			.notNull()
			.references(() => offers.id, { onDelete: "cascade" }),

		offerFormatId: integer("offer_format_id")
			.notNull()
			.references(() => offer_format.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ columns: [table.offerId, table.offerFormatId] })],
);

export const offerOfferFormatRelations = relations(offer_offer_format, ({ one }) => ({
	offer: one(offers, {
		fields: [offer_offer_format.offerId],
		references: [offers.id],
	}),
	offerFormat: one(offer_format, {
		fields: [offer_offer_format.offerFormatId],
		references: [offer_format.id],
	}),
}));

import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { offer_level } from "../tables/dictionary/offer_level.table";
import { offers } from "../tables/offer.table";

export const offer_offer_level = pgTable(
	"offers_offer_levels",
	{
		offerLevelId: integer("offer_level_id")
			.notNull()
			.references(() => offer_level.id, { onDelete: "cascade" }),
		offerId: integer("offer_id")
			.notNull()
			.references(() => offers.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ columns: [table.offerLevelId, table.offerId] })],
);

export const offersOfferLevelsRelations = relations(offer_offer_level, ({ one }) => ({
	offer: one(offers, {
		fields: [offer_offer_level.offerId],
		references: [offers.id],
	}),
	offerLevel: one(offer_level, {
		fields: [offer_offer_level.offerLevelId],
		references: [offer_level.id],
	}),
}));

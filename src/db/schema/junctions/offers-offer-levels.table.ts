import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { offerLevels } from "../tables/dictionary/offer-levels.table";
import { offers } from "../tables/offers.table";

export const offersOfferLevels = pgTable(
	"offers_offer_levels",
	{
		offer_id: integer("offer_id")
			.notNull()
			.references(() => offers.id, { onDelete: "cascade" }),
		offer_level_id: integer("offer_level_id")
			.notNull()
			.references(() => offerLevels.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ columns: [table.offer_id, table.offer_level_id] })],
);

export const offersOfferLevelsRelations = relations(offersOfferLevels, ({ one }) => ({
	offer: one(offers, {
		fields: [offersOfferLevels.offer_id],
		references: [offers.id],
	}),
	offerLevel: one(offerLevels, {
		fields: [offersOfferLevels.offer_level_id],
		references: [offerLevels.id],
	}),
}));

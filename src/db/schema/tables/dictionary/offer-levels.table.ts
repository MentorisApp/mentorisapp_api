import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { offersOfferLevels } from "../../junctions/offers-offer-levels.table";
import { timestampColumns } from "../../partials/timestampColumns";

export const offerLevels = pgTable("offer_levels", {
	id: serial("id").primaryKey(),
	code: varchar("code", { length: 50 }).notNull().unique(),
	label: varchar("label", { length: 50 }).notNull().unique(),
	active: boolean("active").default(true),
	...timestampColumns,
});

export const offerLevelsRelations = relations(offerLevels, ({ many }) => ({
	offersOfferLevels: many(offersOfferLevels),
}));

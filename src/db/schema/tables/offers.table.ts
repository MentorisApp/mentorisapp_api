import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { users } from "./users.table";
import { offersOfferCategories } from "../junctions/offers-offer-categories.table";
import { offersOfferFormats } from "../junctions/offers-offer-formats.table";
import { offersOfferLevels } from "../junctions/offers-offer-levels.table";
import { modColumns } from "../partials/modColumns";
import { timestampColumns } from "../partials/timestampColumns";

export const offers = pgTable("offers", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	user_id: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" })
		.unique(),

	price_from_cents: integer("price_from_cents"),
	price_to_cents: integer("price_to_cents"),

	...modColumns,
	...timestampColumns,
});

export const offersRelations = relations(offers, ({ many }) => ({
	offersOfferCategories: many(offersOfferCategories),
	offersOfferLevels: many(offersOfferLevels),
	offersOfferFormats: many(offersOfferFormats),
}));

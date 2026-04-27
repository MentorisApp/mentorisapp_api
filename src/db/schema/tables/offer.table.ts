import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { users } from "./user.table";
import { offers_categories } from "../junctions/offer_category.table";
import { offer_offer_format } from "../junctions/offer_offer_format.table";
import { offer_offer_level } from "../junctions/offer_offer_level.table";
import { modColumns } from "../partials/modColumns";
import { timestampColumns } from "../partials/timestampColumns";

export const offers = pgTable("offers", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" })
		.unique(),

	priceFromCents: integer("price_from_cents"),
	priceToCents: integer("price_to_cents"),

	...modColumns,
	...timestampColumns,
});

export const offersRelations = relations(offers, ({ many }) => ({
	offerCategories: many(offers_categories),
	offerLevels: many(offer_offer_level),
	offerFormats: many(offer_offer_format),
}));

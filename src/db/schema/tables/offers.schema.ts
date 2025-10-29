import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { OFFER_FORMAT_ENUM, OFFER_LEVEL_ENUM, PRICE_TYPE_ENUM } from "../enums/db.enum.schema";
import { offers_categories } from "../junctions/offers_categories.schema";
import { modColumns } from "../partials/modColumns";
import { timestampColumns } from "../partials/timestampColumns";
import { users } from "./users.schema";

export const offers = pgTable("offers", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" })
		.unique(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	priceType: PRICE_TYPE_ENUM("price_type").notNull(),
	price: numeric("price", { precision: 10, scale: 2 }),
	priceFrom: numeric("price_from", { precision: 10, scale: 2 }),
	priceTo: numeric("price_to", { precision: 10, scale: 2 }),
	level: OFFER_LEVEL_ENUM("level").notNull(),
	format: OFFER_FORMAT_ENUM("format").notNull(),
	...modColumns,
	...timestampColumns,
});

// TODO Add in payment gateway story phase
// expiresAt: timestamp("expires_at").defaultNow().notNull(),
// expiredAt: timestamp("expired_at").defaultNow().notNull(),
// isPaid: boolean("is_paid").notNull().default(false),
// Geolocation coordinates when map feature implemented

export const offersRelations = relations(offers, ({ many }) => ({
	offersCategories: many(offers_categories),
}));

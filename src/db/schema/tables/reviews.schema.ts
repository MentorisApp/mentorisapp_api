import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, serial, text } from "drizzle-orm/pg-core";
import { modColumns } from "../partials/modColumns";
import { timestampColumns } from "../partials/timestampColumns";
import { offers } from "./offers.schema";
import { users } from "./users.schema";

export const reviews = pgTable("reviews", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	offerId: integer("offer_id")
		.notNull()
		.references(() => offers.id, { onDelete: "cascade" }),
	rating: numeric("rating", { precision: 2, scale: 1, mode: "number" }).notNull(),
	description: text("description"),
	...timestampColumns,
	...modColumns,
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
	user: one(users, {
		fields: [reviews.userId],
		references: [users.id],
	}),
	offer: one(offers, {
		fields: [reviews.offerId],
		references: [offers.id],
	}),
}));

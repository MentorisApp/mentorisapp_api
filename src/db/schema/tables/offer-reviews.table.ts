import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, serial, text } from "drizzle-orm/pg-core";

import { offers } from "./offers.table";
import { users } from "./users.table";
import { modColumns } from "../partials/modColumns";
import { timestampColumns } from "../partials/timestampColumns";

export const offerReviews = pgTable("offer_reviews", {
	id: serial("id").primaryKey(),
	user_id: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	offer_id: integer("offer_id")
		.notNull()
		.references(() => offers.id, { onDelete: "cascade" }),
	rating: numeric("rating", { precision: 2, scale: 1, mode: "number" }).notNull(),
	description: text("description"),
	...timestampColumns,
	...modColumns,
});

export const offerReviewsRelations = relations(offerReviews, ({ one }) => ({
	user: one(users, {
		fields: [offerReviews.user_id],
		references: [users.id],
	}),
	offer: one(offers, {
		fields: [offerReviews.offer_id],
		references: [offers.id],
	}),
}));

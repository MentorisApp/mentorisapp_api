import { relations } from "drizzle-orm";
import { date, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { users } from "./users.table";
import { timestampColumns } from "../partials/timestampColumns";

export const profiles = pgTable("profiles", {
	id: serial("id").primaryKey(),
	profile_picture_url: varchar("profile_picture_url", { length: 255 }),
	name: varchar("name", { length: 255 }).notNull(),
	bio: text("bio"),
	dob: date("dob"),
	user_id: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" })
		.unique(),
	...timestampColumns,
});

export const profilesRelations = relations(profiles, ({ one }) => ({
	user: one(users, {
		fields: [profiles.user_id],
		references: [users.id],
	}),
}));

import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { profiles } from "./profiles.table";
import { userRoles } from "./user-roles.table";
import { timestampColumns } from "../partials/timestampColumns";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	role_id: integer("role_id")
		.notNull()
		.references(() => userRoles.id, { onDelete: "restrict" }),
	is_verified: boolean("is_verified").default(false).notNull(),
	...timestampColumns,
});

export const usersRelations = relations(users, ({ one }) => ({
	profile: one(profiles, {
		fields: [users.id],
		references: [profiles.user_id],
	}),
	userRole: one(userRoles, {
		fields: [users.role_id],
		references: [userRoles.id],
	}),
}));

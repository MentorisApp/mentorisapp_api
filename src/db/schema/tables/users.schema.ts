import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { profiles } from "./profiles.schema";
import { roles } from "./roles.schema";
import { timestampColumns } from "../partials/timestampColumns";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	roleId: integer("role_id")
		.notNull()
		.references(() => roles.id, { onDelete: "restrict" }),
	isVerified: boolean().default(false),
	...timestampColumns,
});

export const usersRelations = relations(users, ({ one }) => ({
	profile: one(profiles, {
		fields: [users.id],
		references: [profiles.userId],
	}),
	role: one(roles, {
		fields: [users.roleId],
		references: [roles.id],
	}),
}));

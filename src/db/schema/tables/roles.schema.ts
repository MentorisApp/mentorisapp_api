import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { roles_permissions } from "../junctions/roles_permissions.schema";

export const roles = pgTable("roles", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
	rolesPermissions: many(roles_permissions),
}));

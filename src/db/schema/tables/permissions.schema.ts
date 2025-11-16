import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { roles_permissions } from "../junctions/roles_permissions.schema";

export const permissions = pgTable("permissions", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull().unique(),
});

export const permissionsRelations = relations(permissions, ({ many }) => ({
	rolesPermissions: many(roles_permissions),
}));

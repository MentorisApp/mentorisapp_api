import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { timestampColumns } from "../../partials/timestampColumns";

export const userRoles = pgTable("user_roles", {
	id: serial("id").primaryKey(),
	code: varchar("code", { length: 50 }).notNull().unique(),
	label: varchar("label", { length: 50 }).notNull().unique(),
	active: boolean("active").default(true),
	...timestampColumns,
});

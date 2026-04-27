import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { timestampColumns } from "../../partials/timestampColumns";

// TODO connect city table to offer table
export const cities = pgTable("cities", {
	id: serial("id").primaryKey(),
	code: varchar("code", { length: 50 }).notNull().unique(),
	label: varchar("label", { length: 50 }).notNull().unique(),
	active: boolean("active").default(true),
	...timestampColumns,
});

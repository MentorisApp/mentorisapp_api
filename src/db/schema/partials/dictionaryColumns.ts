import { boolean, serial, varchar } from "drizzle-orm/pg-core";

import { timestampColumns } from "./timestampColumns";

export const dictionaryColumns = {
	id: serial("id").primaryKey(),
	code: varchar("code", { length: 50 }).notNull().unique(),
	label: varchar("label", { length: 50 }).notNull().unique(),
	active: boolean("active").default(true),
	...timestampColumns,
};

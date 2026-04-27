import { boolean, serial, varchar } from "drizzle-orm/pg-core";

import { timestampColumns } from "./timestampColumns";

export const dictionaryColumns = {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
	code: varchar("code", { length: 50 }).notNull().unique(),
	active: boolean("active").default(true),
	...timestampColumns,
};

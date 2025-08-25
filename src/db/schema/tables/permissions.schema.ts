import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const permissions = pgTable("permissions", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull().unique(),
});

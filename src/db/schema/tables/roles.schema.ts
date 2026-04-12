import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
});

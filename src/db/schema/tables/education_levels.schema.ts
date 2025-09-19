import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const education_levels = pgTable("education_levels", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
});

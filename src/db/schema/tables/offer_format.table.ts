import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const offer_format = pgTable("offer_format", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
});

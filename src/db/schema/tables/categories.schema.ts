import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

import { offers_categories } from "../junctions/offers_categories.schema";

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	offersCategories: many(offers_categories),
}));

import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { roles } from "./roles.schema";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	roleId: integer("role_id")
		.notNull()
		.references(() => roles.id, { onDelete: "restrict" }),
	isVerified: boolean().default(false),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
	role: one(roles, {
		fields: [users.roleId],
		references: [roles.id],
	}),
}));

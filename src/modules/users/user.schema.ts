import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { roles } from "modules/roles/role.schema";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	roleId: integer("role_id")
		.notNull()
		.references(() => roles.id, { onDelete: "restrict", onUpdate: "cascade" }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// export type User = typeof users.$inferSelect;
// export type NewUser = typeof users.$inferInsert;

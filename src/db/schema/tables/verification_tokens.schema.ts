import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { verificationTokenContextEnum } from "../enums/db.enum.schema";
import { users } from "./users.schema";

export const verification_tokens = pgTable("verification_tokens", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	context: verificationTokenContextEnum("context").notNull(),
	token: text("token").notNull().unique(),
	used: boolean("used").default(false),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

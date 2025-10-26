import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { timestampColumns } from "../partials/timestampColumns";
import { users } from "./users.schema";

export const refresh_tokens = pgTable("refresh_tokens", {
	id: serial("id").primaryKey(),
	jti: varchar("jti", { length: 36 }).notNull().unique(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	revoked: boolean("revoked").default(false).notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	...timestampColumns,
});

import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { users } from "./users.table";
import { timestampColumns } from "../partials/timestampColumns";

export const refreshTokens = pgTable("refresh_tokens", {
	id: serial("id").primaryKey(),
	jti: varchar("jti", { length: 36 }).notNull().unique(),
	user_id: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	revoked: boolean("revoked").default(false).notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
	...timestampColumns,
});

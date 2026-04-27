import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users.table";
import { VERIFICATION_TOKEN_CONTEXT_ENUM } from "../enums/db.enum.schema";
import { timestampColumns } from "../partials/timestampColumns";

export const verificationTokens = pgTable("verification_tokens", {
	id: serial("id").primaryKey(),
	user_id: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	context: VERIFICATION_TOKEN_CONTEXT_ENUM("context"),
	token: text("token").notNull().unique(),
	used: boolean("used").default(false),
	expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
	...timestampColumns,
});

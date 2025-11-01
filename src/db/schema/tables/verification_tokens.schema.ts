import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users.schema";
import { VERIFICATION_TOKEN_CONTEXT_ENUM } from "../enums/db.enum.schema";
import { timestampColumns } from "../partials/timestampColumns";

export const verification_tokens = pgTable("verification_tokens", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	context: VERIFICATION_TOKEN_CONTEXT_ENUM("context").notNull(),
	token: text("token").notNull().unique(),
	used: boolean("used").default(false),
	expiresAt: timestamp("expires_at").notNull(),
	...timestampColumns,
});

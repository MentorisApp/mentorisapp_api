import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const verificationTokenContextEnum = pgEnum("verification_token_context", [
	"email_verification",
	"password_reset",
]);

export const verification_tokens = pgTable("verification_tokens", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
	context: verificationTokenContextEnum("context").notNull().default("email_verification"),
	token: text("token").notNull().unique(),
	used: boolean("used").default(false),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export type VerificationTokenContext = (typeof verificationTokenContextEnum.enumValues)[number];

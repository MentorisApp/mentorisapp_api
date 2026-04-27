import { pgEnum } from "drizzle-orm/pg-core";

export const VERIFICATION_TOKEN_CONTEXT_ENUM = pgEnum("verification_token_context", [
	"email_verification",
	"password_reset",
]);

export const STATUS_ENUM = pgEnum("mod_status", ["PENDING", "APPROVED", "REJECTED", "INACTIVE"]);

export type VerificationTokenContext = (typeof VERIFICATION_TOKEN_CONTEXT_ENUM.enumValues)[number];
export type ModStatus = (typeof STATUS_ENUM.enumValues)[number];

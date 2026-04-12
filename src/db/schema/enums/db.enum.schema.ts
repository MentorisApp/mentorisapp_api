import { pgEnum } from "drizzle-orm/pg-core";

export const VERIFICATION_TOKEN_CONTEXT_ENUM = pgEnum("verification_token_context", [
	"email_verification",
	"password_reset",
]);

// TODO sifrarnik
export const OFFER_LEVEL_ENUM = pgEnum("offer_level", ["OSNOVNA", "SREDNJA", "FAKULTET", "MATURA"]);

export const STATUS_ENUM = pgEnum("mod_status", ["PENDING", "APPROVED", "REJECTED", "INACTIVE"]);

export const PRICE_TYPE_ENUM = pgEnum("price_type", ["FIXED", "RANGE"]);

export type VerificationTokenContext = (typeof VERIFICATION_TOKEN_CONTEXT_ENUM.enumValues)[number];
export type OfferLevel = (typeof OFFER_LEVEL_ENUM.enumValues)[number];
export type ModStatus = (typeof STATUS_ENUM.enumValues)[number];

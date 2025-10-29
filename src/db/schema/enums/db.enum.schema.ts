import { pgEnum } from "drizzle-orm/pg-core";

export const VERIFICATION_TOKEN_CONTEXT_ENUM = pgEnum("verification_token_context", [
	"EMAIL_VERIFICATION",
	"PASSWORD_RESET",
]);

export const OFFER_LEVEL_ENUM = pgEnum("offer_level", ["OSNOVNA", "SREDNJA", "FAKULTET", "MATURA"]);

export const OFFER_FORMAT_ENUM = pgEnum("offer_format", ["UZIVO", "ONLINE", "OBOJE"]);

export const STATUS_ENUM = pgEnum("mod_status", ["PENDING", "APPROVED", "REJECTED", "INACTIVE"]);

export const PRICE_TYPE_ENUM = pgEnum("price_type", ["FIXED", "RANGE"]);

export type VerificationTokenContext = (typeof VERIFICATION_TOKEN_CONTEXT_ENUM.enumValues)[number];
export type OfferLevel = (typeof OFFER_LEVEL_ENUM.enumValues)[number];
export type ModStatus = (typeof STATUS_ENUM.enumValues)[number];
export type OfferFormat = (typeof OFFER_FORMAT_ENUM.enumValues)[number];

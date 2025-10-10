import { pgEnum } from "drizzle-orm/pg-core";

export const verificationTokenContextEnum = pgEnum("verification_token_context", [
	"EMAIL_VERIFICATION",
	"PASSWORD_RESET",
]);

export const offerLevelEnum = pgEnum("offer_level", ["OSNOVNA", "SREDNJA", "FAKULTET", "MATURA"]);

export const offerFormatEnum = pgEnum("offer_format", ["UZIVO", "ONLINE", "OBOJE"]);

export const offerStatusEnum = pgEnum("offer_status", [
	"PENDING",
	"APPROVED",
	"REJECTED",
	"INACTIVE",
]);

export const priceTypeEnum = pgEnum("price_type", ["FIXED", "RANGE"]);

export type VerificationTokenContext = (typeof verificationTokenContextEnum.enumValues)[number];
export type OfferLevel = (typeof offerLevelEnum.enumValues)[number];
export type OfferStatus = (typeof offerStatusEnum.enumValues)[number];
export type OfferFormat = (typeof offerFormatEnum.enumValues)[number];

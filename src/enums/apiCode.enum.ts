export enum ApiCode {
	// Success
	OK = "OK",
	CREATED = "CREATED",
	NO_CONTENT = "NO_CONTENT",
	ACCEPTED = "ACCEPTED",

	// Client errors
	BAD_REQUEST = "BAD_REQUEST",
	UNAUTHORIZED = "UNAUTHORIZED",
	FORBIDDEN = "FORBIDDEN",
	NOT_FOUND = "NOT_FOUND",
	CONFLICT = "CONFLICT",
	VALIDATION_ERROR = "VALIDATION_ERROR",
	TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",

	// Server errors
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
	SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
}

export enum DomainCode {
	EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
	INVALID_VERIFICATION_TOKEN = "INVALID_VERIFICATION_TOKEN",
	OFFER_ALREADY_REVIEWED = "OFFER_ALREADY_REVIEWED",
	SELF_REVIEW_NOT_ALLOWED = "SELF_REVIEW_NOT_ALLOWED",
	USER_ALREADY_VERIFIED = "USER_ALREADY_VERIFIED",
	INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
}

const DomainCodes = Object.values(DomainCode) as readonly DomainCode[];
const ApiCodes = Object.values(ApiCode) as readonly ApiCode[];

export const ErrorCodes = [...Object.values(ApiCode), ...Object.values(DomainCode)] as const;

export type DomainCodeType = (typeof DomainCodes)[number];
export type ApiCodeType = (typeof ApiCodes)[number];
export type ErrorCodeType = (typeof ErrorCodes)[number];

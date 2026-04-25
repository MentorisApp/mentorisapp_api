import { ApiCode, DomainCode, ErrorCodeType } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

export function buildErrorResponse(error: Partial<ErrorResponse>): ErrorResponse {
	return {
		code: error.code ?? ApiCode.INTERNAL_SERVER_ERROR,
		message: error.message ?? "Internal Server Error",
		fieldErrors: error.fieldErrors ?? null,
	};
}

export const errorCodeToHttpStatus: Record<ErrorCodeType, HttpStatus> = {
	// =========================
	// Success (not typically used in errors, but included for completeness)
	// =========================
	[ApiCode.OK]: HttpStatus.OK,
	[ApiCode.CREATED]: HttpStatus.CREATED,
	[ApiCode.NO_CONTENT]: HttpStatus.NO_CONTENT,
	[ApiCode.ACCEPTED]: HttpStatus.ACCEPTED,

	// =========================
	// Client errors
	// =========================
	[ApiCode.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
	[ApiCode.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
	[ApiCode.FORBIDDEN]: HttpStatus.FORBIDDEN,
	[ApiCode.NOT_FOUND]: HttpStatus.NOT_FOUND,
	[ApiCode.CONFLICT]: HttpStatus.CONFLICT,
	[ApiCode.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
	[ApiCode.TOO_MANY_REQUESTS]: HttpStatus.TOO_MANY_REQUESTS,

	// =========================
	// Server errors
	// =========================
	[ApiCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
	[ApiCode.SERVICE_UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,

	// =========================
	// Domain errors (business logic → mapped to HTTP)
	// =========================
	[DomainCode.EMAIL_NOT_VERIFIED]: HttpStatus.FORBIDDEN,
	[DomainCode.INVALID_VERIFICATION_TOKEN]: HttpStatus.BAD_REQUEST,
	[DomainCode.OFFER_ALREADY_REVIEWED]: HttpStatus.CONFLICT,
	[DomainCode.SELF_REVIEW_NOT_ALLOWED]: HttpStatus.FORBIDDEN,
	[DomainCode.USER_ALREADY_VERIFIED]: HttpStatus.CONFLICT,
	[DomainCode.INVALID_CREDENTIALS]: HttpStatus.UNAUTHORIZED,
};

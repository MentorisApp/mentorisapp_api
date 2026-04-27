import { ApiErrorCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { ErrorResponse } from "~/shared/schemas/responseError.schema";

export function buildErrorResponse(error: Partial<ErrorResponse>): ErrorResponse {
	return {
		code: error.code ?? ApiErrorCode.INTERNAL_SERVER_ERROR,
		message: error.message ?? "Internal Server Error",
		fieldErrors: error.fieldErrors ?? null,
	};
}

export const errorCodeToHttpStatus: Record<ApiErrorCode, HttpStatus> = {
	// Client
	[ApiErrorCode.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
	[ApiErrorCode.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
	[ApiErrorCode.FORBIDDEN]: HttpStatus.FORBIDDEN,
	[ApiErrorCode.NOT_FOUND]: HttpStatus.NOT_FOUND,
	[ApiErrorCode.CONFLICT]: HttpStatus.CONFLICT,
	[ApiErrorCode.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
	[ApiErrorCode.TOO_MANY_REQUESTS]: HttpStatus.TOO_MANY_REQUESTS,
	// Server
	[ApiErrorCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
	[ApiErrorCode.SERVICE_UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
	// Domain
	[ApiErrorCode.EMAIL_NOT_VERIFIED]: HttpStatus.FORBIDDEN,
	[ApiErrorCode.INVALID_VERIFICATION_TOKEN]: HttpStatus.BAD_REQUEST,
	[ApiErrorCode.OFFER_ALREADY_REVIEWED]: HttpStatus.CONFLICT,
	[ApiErrorCode.SELF_REVIEW_NOT_ALLOWED]: HttpStatus.FORBIDDEN,
	[ApiErrorCode.USER_ALREADY_VERIFIED]: HttpStatus.CONFLICT,
	[ApiErrorCode.INVALID_CREDENTIALS]: HttpStatus.UNAUTHORIZED,
};

import { ApiCode } from "~/enums/apiCode.enum";
import { ErrorResponse } from "~/shared/schemas/apiResponse.schema";

export function buildErrorResponse(error: Partial<ErrorResponse>): ErrorResponse {
	return {
		code: error.code ?? ApiCode.INTERNAL_SERVER_ERROR,
		message: error.message ?? "Internal Server Error",
		fieldErrors: error.fieldErrors ?? null,
	};
}

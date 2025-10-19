import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import type { ApiErrorResponse, Metadata } from "~/types/response.types";
import { createMetadata } from "~/utils/response.util";

export class ErrorResponse implements ApiErrorResponse {
	success: false = false;
	message: string;
	detail: ApiErrorResponse["detail"];
	meta: Metadata & { status: HttpStatus };
	code?: string | null;

	constructor({
		status = HttpStatus.INTERNAL_SERVER_ERROR,
		message = "Something went wrong",
		detail = null,
		code = null,
	}: {
		status?: HttpStatus;
		message?: string;
		detail?: ApiErrorResponse["detail"];
		code?: string | null;
	} = {}) {
		const { requestId, timestamp }: Metadata = createMetadata();

		this.message = message;
		this.detail = detail;
		this.code = code;
		this.meta = {
			status,
			requestId,
			timestamp,
		};
	}
}

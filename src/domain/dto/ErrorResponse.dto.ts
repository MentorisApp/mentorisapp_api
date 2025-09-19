import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import type { ApiErrorResponse, Metadata } from "~/types/response.type";
import { createMetadata } from "~/utils/response.util";

export class ErrorResponse implements ApiErrorResponse {
	success: false = false;
	message: string;
	detail: ApiErrorResponse["detail"];
	meta: Metadata & { status: HttpStatus };

	constructor({
		status = HttpStatus.INTERNAL_SERVER_ERROR,
		message = "Something went wrong",
		detail = null,
	}: {
		status?: HttpStatus;
		message?: string;
		detail?: ApiErrorResponse["detail"];
	} = {}) {
		const { requestId, timestamp }: Metadata = createMetadata();

		this.message = message;
		this.detail = detail;
		this.meta = {
			status,
			requestId,
			timestamp,
		};
	}
}

import { ApiErrorCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class TooManyRequestsError extends AppError {
	constructor(message = "Too many attempts") {
		super(message, ApiErrorCode.TOO_MANY_REQUESTS);
	}
}

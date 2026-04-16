import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class TooManyRequestsError extends AppError {
	constructor(message = "Too many attempts") {
		super(message, HttpStatus.TOO_MANY_REQUESTS, ApiCode.TOO_MANY_REQUESTS);
	}
}

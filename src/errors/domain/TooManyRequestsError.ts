import { ApiCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

import { AppError } from "../base/AppError";

export class TooManyRequestsError extends AppError {
	constructor(message = "Too many attempts") {
		super(message, HttpStatus.TOO_MANY_REQUESTS, ApiCode.TOO_MANY_REQUESTS, null);
	}
}

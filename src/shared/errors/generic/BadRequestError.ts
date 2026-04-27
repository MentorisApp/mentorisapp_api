import { ApiErrorCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class BadRequestError extends AppError {
	constructor(message = "Bad request") {
		super(message, ApiErrorCode.BAD_REQUEST);
	}
}

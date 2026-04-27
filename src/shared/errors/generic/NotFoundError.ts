import { ApiErrorCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, ApiErrorCode.NOT_FOUND);
	}
}

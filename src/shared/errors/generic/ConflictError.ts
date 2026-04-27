import { ApiErrorCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class ConflictError extends AppError {
	constructor(message = "Conflict") {
		super(message, ApiErrorCode.CONFLICT);
	}
}

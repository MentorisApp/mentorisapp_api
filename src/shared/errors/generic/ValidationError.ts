import { ApiCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class ValidationError extends AppError {
	constructor(message = "Validation failed") {
		super(message, ApiCode.VALIDATION_ERROR);
	}
}

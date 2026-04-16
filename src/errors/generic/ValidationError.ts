import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class ValidationError extends AppError {
	constructor(message = "Validation failed") {
		super(message, HttpStatus.UNPROCESSABLE_ENTITY, ApiCode.VALIDATION_ERROR);
	}
}

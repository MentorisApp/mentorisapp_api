import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class ValidationError extends AppError {
	constructor(message = "Validation failed") {
		super(message, HttpStatus.BAD_REQUEST, ApiCode.VALIDATION_ERROR);
	}
}

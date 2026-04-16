import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class ConflictError extends AppError {
	constructor(message = "Conflict") {
		super(message, HttpStatus.CONFLICT, ApiCode.CONFLICT);
	}
}

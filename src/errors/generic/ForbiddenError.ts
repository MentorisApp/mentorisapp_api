import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super(message, HttpStatus.FORBIDDEN, ApiCode.FORBIDDEN);
	}
}

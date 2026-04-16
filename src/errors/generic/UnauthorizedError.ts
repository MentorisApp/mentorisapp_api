import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, HttpStatus.UNAUTHORIZED, ApiCode.UNAUTHORIZED);
	}
}

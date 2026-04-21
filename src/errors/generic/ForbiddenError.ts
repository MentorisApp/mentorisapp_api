import { ApiCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

import { AppError } from "../base/AppError";

export class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super(message, HttpStatus.FORBIDDEN, ApiCode.FORBIDDEN);
	}
}

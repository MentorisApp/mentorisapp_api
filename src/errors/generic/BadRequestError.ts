import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class BadRequestError extends AppError {
	constructor(message = "Bad request") {
		super(message, HttpStatus.BAD_REQUEST, ApiCode.BAD_REQUEST);
	}
}

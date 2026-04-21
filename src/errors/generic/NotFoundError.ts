import { ApiCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

import { AppError } from "../base/AppError";

export class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, HttpStatus.NOT_FOUND, ApiCode.NOT_FOUND);
	}
}

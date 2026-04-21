import { ApiCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

import { AppError } from "../base/AppError";

export class ConflictError extends AppError {
	constructor(message = "Conflict") {
		super(message, HttpStatus.CONFLICT, ApiCode.CONFLICT);
	}
}

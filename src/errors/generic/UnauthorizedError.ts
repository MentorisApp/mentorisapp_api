import { ApiCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

import { AppError } from "../base/AppError";

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, HttpStatus.UNAUTHORIZED, ApiCode.UNAUTHORIZED);
	}
}

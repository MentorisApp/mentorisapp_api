import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class InvalidCredentialsError extends AppError {
	constructor(message = "Invalid email or password") {
		super(message, HttpStatus.UNAUTHORIZED, ApiCode.UNAUTHORIZED);
	}
}

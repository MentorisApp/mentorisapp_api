import { ApiCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

import { AppError } from "../base/AppError";

export class InvalidCredentialsError extends AppError {
	constructor(message = "Invalid email or password") {
		super(message, HttpStatus.UNAUTHORIZED, ApiCode.UNAUTHORIZED, null);
	}
}

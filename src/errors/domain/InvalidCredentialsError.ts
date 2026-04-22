import { DomainCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class InvalidCredentialsError extends AppError {
	constructor(message = "Invalid email or password") {
		super(message, DomainCode.INVALID_CREDENTIALS);
	}
}

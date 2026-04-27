import { ApiErrorCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class AccountNotVerifiedError extends AppError {
	constructor(message = "Account not yet verified") {
		super(message, ApiErrorCode.EMAIL_NOT_VERIFIED);
	}
}

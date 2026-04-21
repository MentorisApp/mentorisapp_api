import { ApiCode } from "~/enums/apiCode.enum";
import { DomainCode } from "~/enums/domainCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

import { AppError } from "../base/AppError";

export class AccountNotVerifiedError extends AppError {
	constructor(message = "Account not yet verified") {
		super(message, HttpStatus.CONFLICT, ApiCode.CONFLICT, DomainCode.EMAIL_NOT_VERIFIED);
	}
}

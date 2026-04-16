import { ApiCode } from "~/constants/apiCode.enum";
import { DomainCode } from "~/constants/domainCodes.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class AccountNotVerifiedError extends AppError {
	constructor(message = "Account not yet verified") {
		super(message, HttpStatus.CONFLICT, ApiCode.CONFLICT, DomainCode.EMAIL_NOT_VERIFIED);
	}
}

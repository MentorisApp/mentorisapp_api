import { ApiCode } from "~/constants/apiCode.enum";
import { DomainCode } from "~/constants/domainCodes.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import { AppError } from "../base/AppError";

export class AlreadyVerifiedError extends AppError {
	constructor() {
		super(
			"User already verified",
			HttpStatus.CONFLICT,
			ApiCode.CONFLICT,
			DomainCode.USER_ALREADY_VERIFIED,
		);
	}
}

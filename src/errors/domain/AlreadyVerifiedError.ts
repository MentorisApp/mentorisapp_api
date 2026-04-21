import { ApiCode } from "~/enums/apiCode.enum";
import { DomainCode } from "~/enums/domainCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

import { AppError } from "../base/AppError";

export class AlreadyVerifiedError extends AppError {
	constructor() {
		super("User already verified", HttpStatus.CONFLICT, DomainCode.USER_ALREADY_VERIFIED);
	}
}

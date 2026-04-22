import { DomainCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class AlreadyVerifiedError extends AppError {
	constructor() {
		super("User already verified", DomainCode.USER_ALREADY_VERIFIED);
	}
}

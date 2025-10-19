import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class AccountNotVerifiedError extends Error {
	statusCode: number;
	code: string;

	constructor(message = "Account not yet verified") {
		super(message);
		this.name = "AccountNotVerifiedError";
		this.statusCode = HttpStatus.CONFLICT;
		this.code = "ACCOUNT_NOT_VERIFIED";
		Object.setPrototypeOf(this, AccountNotVerifiedError.prototype);
	}
}

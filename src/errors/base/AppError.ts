import { ApiCode } from "~/constants/apiCode.enum";
import { DomainCode } from "~/constants/domainCodes.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class AppError extends Error {
	public readonly statusCode: HttpStatus;
	public readonly code: ApiCode;
	public readonly domainCode?: DomainCode;

	constructor(message: string, statusCode: HttpStatus, code: ApiCode, domainCode?: DomainCode) {
		super(message);

		this.statusCode = statusCode;
		this.code = code;
		this.domainCode = domainCode;

		Object.setPrototypeOf(this, new.target.prototype);
	}
}

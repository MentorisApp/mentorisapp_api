import { ApiCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";

export class AppError extends Error {
	public readonly statusCode: HttpStatus;
	public readonly code: ApiCode;

	constructor(message: string, statusCode: HttpStatus, code: ApiCode) {
		super(message);

		this.statusCode = statusCode;
		this.code = code;

		Object.setPrototypeOf(this, new.target.prototype);
	}
}

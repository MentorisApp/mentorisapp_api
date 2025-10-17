import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class TooManyRequestsError extends Error {
	statusCode: number;

	constructor(message = "Too many requests") {
		super(message);
		this.name = "TooManyRequestsError";
		this.statusCode = HttpStatus.TOO_MANY_REQUESTS;
		Object.setPrototypeOf(this, TooManyRequestsError.prototype);
	}
}

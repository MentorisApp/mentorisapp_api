import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class BadRequestError extends Error {
	statusCode: number;

	constructor(message = "Bad request") {
		super(message);
		this.name = "BadRequestError";
		this.statusCode = HttpStatus.BAD_REQUEST;
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}

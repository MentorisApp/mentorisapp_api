import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class NotFoundError extends Error {
	statusCode: number;

	constructor(message = "Resource not found") {
		super(message);
		this.name = "NotFoundError";
		this.statusCode = HttpStatus.NOT_FOUND;
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

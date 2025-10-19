import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class AlreadyExistsError extends Error {
	statusCode: number;

	constructor(message = "Resource already exists") {
		super(message);
		this.name = "AlreadyExistsError";
		this.statusCode = HttpStatus.CONFLICT;
		Object.setPrototypeOf(this, AlreadyExistsError.prototype);
	}
}

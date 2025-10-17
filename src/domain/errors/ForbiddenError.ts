import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class ForbiddenError extends Error {
	statusCode: number;

	constructor(message = "You do not have permission to access this resource") {
		super(message);
		this.name = "ForbiddenError";
		this.statusCode = HttpStatus.FORBIDDEN;
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}

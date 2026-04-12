import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class ForbiddenError extends Error {
	statusCode: number;

	constructor(message = "You are not permitted for this action") {
		super(message);
		this.name = "ForbiddenError";
		this.statusCode = HttpStatus.FORBIDDEN;
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}

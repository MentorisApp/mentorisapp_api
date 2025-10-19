import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class AlreadyVerifiedError extends Error {
	statusCode: number;

	constructor(message = "User already verified") {
		super(message);
		this.name = "AlreadyVerifiedError";
		this.statusCode = HttpStatus.CONFLICT;
		Object.setPrototypeOf(this, AlreadyVerifiedError.prototype);
	}
}

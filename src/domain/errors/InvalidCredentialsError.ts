import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export class InvalidCredentialsError extends Error {
	statusCode: number;

	constructor(message = "Invalid email or password") {
		super(message);
		this.name = "InvalidCredentialsError";
		this.statusCode = HttpStatus.UNAUTHORIZED;
		Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
	}
}

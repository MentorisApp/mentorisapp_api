export class InvalidCredentialsError extends Error {
	constructor(message = "Invalid email or password") {
		super(message);
		this.name = "InvalidCredentialsError";
		Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
	}
}

export class ForbiddenError extends Error {
	constructor(message = "You do not have permission to access this resource") {
		super(message);
		this.name = "ForbiddenError";
		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}

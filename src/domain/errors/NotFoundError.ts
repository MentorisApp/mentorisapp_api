export class NotFoundError extends Error {
	constructor(message = "Resource not found") {
		super(message);
		this.name = "NotFoundError";
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

export class AlreadyExistsError extends Error {
	constructor(message = "Resource already exists") {
		super(message);
		this.name = "AlreadyExistsError";
		Object.setPrototypeOf(this, AlreadyExistsError.prototype);
	}
}

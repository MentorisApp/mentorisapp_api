import { ErrorCodeType } from "~/enums/apiCode.enum";

export class AppError extends Error {
	public readonly code: ErrorCodeType;
	public readonly fieldErrors: Record<string, string[]> | null;

	constructor(
		message: string | null,
		code: ErrorCodeType,
		fieldErrors: Record<string, string[]> | null = null,
	) {
		super(message ?? "");

		this.code = code;
		this.fieldErrors = fieldErrors;

		Object.setPrototypeOf(this, new.target.prototype);
	}
}

import { ApiErrorCode } from "~/enums/apiCode.enum";

export class AppError extends Error {
	public readonly code: ApiErrorCode;
	public readonly fieldErrors: Record<string, string[]> | null;

	constructor(
		message: string | null,
		code: ApiErrorCode,
		fieldErrors: Record<string, string[]> | null = null,
	) {
		super(message ?? "");

		this.code = code;
		this.fieldErrors = fieldErrors;

		Object.setPrototypeOf(this, new.target.prototype);
	}
}

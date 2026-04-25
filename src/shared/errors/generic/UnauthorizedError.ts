import { ApiCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized") {
		super(message, ApiCode.UNAUTHORIZED);
	}
}

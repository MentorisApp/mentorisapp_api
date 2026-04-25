import { ApiCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super(message, ApiCode.FORBIDDEN);
	}
}

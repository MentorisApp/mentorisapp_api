import { ApiCode } from "~/enums/apiCode.enum";

import { AppError } from "../base/AppError";

export class BadRequestError extends AppError {
	constructor(message = "Bad request") {
		super(message, ApiCode.BAD_REQUEST);
	}
}

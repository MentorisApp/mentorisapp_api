import { DatabaseError } from "pg";

import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { PostgresErrorCode } from "~/constants/postgresErrorCodes.enum";
import { NotFoundError } from "~/errors/generic/NotFoundError";

export function unwrapResult<T>(rows: T[], message: string = "Resource not found"): T {
	if (rows.length === 0) {
		throw new NotFoundError(message);
	}
	return rows[0];
}

export function handleDatabaseError(error: DatabaseError): {
	statusCode: HttpStatus;
	message: string;
	code: ApiCode;
} {
	switch (error.code) {
		case PostgresErrorCode.UNIQUE_VIOLATION:
			return {
				statusCode: HttpStatus.CONFLICT,
				message: "Resource already exists",
				code: ApiCode.CONFLICT,
			};

		case PostgresErrorCode.FOREIGN_KEY_VIOLATION:
		case PostgresErrorCode.NOT_NULL_VIOLATION:
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message: "Invalid request data",
				code: ApiCode.BAD_REQUEST,
			};

		case PostgresErrorCode.DEADLOCK_DETECTED:
		case PostgresErrorCode.SERIALIZATION_FAILURE:
			return {
				statusCode: HttpStatus.SERVICE_UNAVAILABLE,
				message: "Database temporarily unavailable, please retry",
				code: ApiCode.SERVICE_UNAVAILABLE,
			};

		default:
			return {
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "Database error",
				code: ApiCode.INTERNAL_SERVER_ERROR,
			};
	}
}

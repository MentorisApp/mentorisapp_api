import { DatabaseError } from "pg";

import { ApiCode, ErrorCodeType } from "~/enums/apiCode.enum";
import { PostgresErrorCode } from "~/enums/postgresErrorCode.enum";
import { NotFoundError } from "~/errors/generic/NotFoundError";

export function unwrapResult<T>(rows: T[], message: string = "Resource not found"): T {
	if (rows.length === 0) {
		throw new NotFoundError(message);
	}
	return rows[0];
}

export function handleDatabaseError(error: DatabaseError): {
	message: string;
	code: ErrorCodeType;
} {
	switch (error.code) {
		case PostgresErrorCode.UNIQUE_VIOLATION:
			return {
				message: "Resource already exists",
				code: ApiCode.CONFLICT,
			};

		case PostgresErrorCode.FOREIGN_KEY_VIOLATION:
		case PostgresErrorCode.NOT_NULL_VIOLATION:
			return {
				message: "Invalid request data",
				code: ApiCode.BAD_REQUEST,
			};

		case PostgresErrorCode.DEADLOCK_DETECTED:
		case PostgresErrorCode.SERIALIZATION_FAILURE:
			return {
				message: "Database temporarily unavailable, please retry",
				code: ApiCode.SERVICE_UNAVAILABLE,
			};

		default:
			return {
				message: "Database error",
				code: ApiCode.INTERNAL_SERVER_ERROR,
			};
	}
}

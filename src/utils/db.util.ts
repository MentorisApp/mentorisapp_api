import { DatabaseError } from "pg";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { PostgresErrorCode } from "~/constants/postgresErrorCodes.enum";
import { NotFoundError } from "~/domain/errors/NotFoundError";

export function unwrapResult<T>(rows: T[], message: string = "Resource not found"): T {
	if (rows.length === 0) {
		throw new NotFoundError(message);
	}
	return rows[0];
}

export function handleDatabaseError(error: DatabaseError): {
	status: HttpStatus;
	message: string;
} {
	switch (error.code) {
		case PostgresErrorCode.UNIQUE_VIOLATION:
			return {
				status: HttpStatus.CONFLICT,
				message: "Resource already exists",
			};

		case PostgresErrorCode.FOREIGN_KEY_VIOLATION:

		case PostgresErrorCode.NOT_NULL_VIOLATION:
			return {
				status: HttpStatus.BAD_REQUEST,
				message: "Invalid request data",
			};

		case PostgresErrorCode.DEADLOCK_DETECTED:

		case PostgresErrorCode.SERIALIZATION_FAILURE:
			return {
				status: HttpStatus.SERVICE_UNAVAILABLE,
				message: "Database temporarily unavailable, please retry",
			};

		default:
			return {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "Database error",
			};
	}
}

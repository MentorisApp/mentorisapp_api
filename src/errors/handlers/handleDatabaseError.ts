import { DrizzleQueryError } from "drizzle-orm/errors";
import { FastifyError, FastifyReply } from "fastify";
import { DatabaseError } from "pg";

import { handleDatabaseError } from "~/utils/db.util";
import { buildErrorResponse, errorCodeToHttpStatus } from "~/utils/errorResponse.util";

export function handleDbError(error: FastifyError, reply: FastifyReply) {
	if (!(error instanceof DrizzleQueryError)) return false;

	const pgError = error.cause;

	if (!(pgError instanceof DatabaseError)) return false;

	const dbError = handleDatabaseError(pgError);

	const response = buildErrorResponse({
		message: dbError.message,
		code: dbError.code,
	});

	reply.status(errorCodeToHttpStatus[dbError.code]).send(response);
	return true;
}

import { DrizzleQueryError } from "drizzle-orm/errors";
import fastify, { FastifyError, FastifyReply } from "fastify";
import { DatabaseError } from "pg";
import { v4 as uuidV4 } from "uuid";
import { ZodError } from "zod";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ErrorResponse } from "~/domain/dto/ErrorResponse.dto";
import { NotFoundError } from "~/domain/errors/NotFoundError";
import { ApiErrorResponse, Metadata } from "~/types/response.type";
import { handleDatabaseError } from "./db.util";

export function createMetadata(): Metadata {
	return {
		requestId: uuidV4(),
		timestamp: new Date().toISOString(),
	};
}

export function sendErrorResponse(error: FastifyError, reply: FastifyReply) {
	let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
	let message = "Something went wrong";
	let detail: ApiErrorResponse["detail"] = null;

	// Validation errors
	if (error instanceof ZodError) {
		status = HttpStatus.BAD_REQUEST;
		message = "Validation error";
		detail = error.issues;
	}

	// Not found entity errors
	if (error instanceof NotFoundError) {
		status = HttpStatus.NOT_FOUND;
		message = error.message;
	}

	// Database errors
	if (error instanceof DrizzleQueryError) {
		const pgError = error.cause;
		if (pgError instanceof DatabaseError) {
			const dbResult = handleDatabaseError(pgError);
			status = dbResult.status;
			message = dbResult.message;
		}
	}

	// Invalid JSON in payload errors
	if (
		error instanceof fastify.errorCodes.FST_ERR_CTP_EMPTY_JSON_BODY ||
		error instanceof SyntaxError
	) {
		status = HttpStatus.BAD_REQUEST;
		message = "Invalid JSON in request body";
		detail = error.message;
	}

	const response = new ErrorResponse({ status, message, detail });
	reply.status(response.status).send(response);
}

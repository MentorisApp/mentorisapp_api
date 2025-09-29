import { DrizzleQueryError } from "drizzle-orm/errors";
import fastify, { FastifyError, FastifyReply } from "fastify";
import { DatabaseError } from "pg";
import z, { ZodError } from "zod";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ErrorResponse } from "~/domain/dto/ErrorResponse.dto";
import { AlreadyExistsError } from "~/domain/errors/AlreadyExistsError";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";
import { InvalidCredentialsError } from "~/domain/errors/InvalidCredentialsError";
import { NotFoundError } from "~/domain/errors/NotFoundError";
import { ApiErrorResponse, Metadata } from "~/types/response.types";
import { handleDatabaseError } from "./db.util";
import { generateUuid } from "./uuid.util";

export function createMetadata(): Metadata {
	return {
		requestId: generateUuid(),
		timestamp: new Date().toISOString(),
	};
}

export function sendErrorResponse(error: FastifyError, reply: FastifyReply) {
	let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
	let message = error.message;
	let detail: ApiErrorResponse["detail"] = null;

	if (error instanceof ZodError) {
		status = HttpStatus.BAD_REQUEST;
		message = "Validation error";
		detail = z.flattenError(error);
	}

	if (error instanceof NotFoundError) {
		status = HttpStatus.NOT_FOUND;
	}

	if (error instanceof AlreadyExistsError) {
		status = HttpStatus.CONFLICT;
	}

	if (error instanceof InvalidCredentialsError) {
		status = HttpStatus.UNAUTHORIZED;
	}
	if (error instanceof ForbiddenError) {
		status = HttpStatus.FORBIDDEN;
	}

	if (error instanceof DrizzleQueryError) {
		const pgError = error.cause;
		if (pgError instanceof DatabaseError) {
			const dbResult = handleDatabaseError(pgError);
			status = dbResult.status;
			message = dbResult.message;
			detail = pgError.detail || null;
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

	// Dumb object error code check (just instance of FastifyError)
	if (
		error.code === "FST_JWT_NO_AUTHORIZATION_IN_HEADER" ||
		error.code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED"
	) {
		status = HttpStatus.UNAUTHORIZED;
		message = "Unauthorized";
		detail = error.message;
	}

	const response = new ErrorResponse({ status, message, detail });
	reply.status(response.meta.status).send(response);
}

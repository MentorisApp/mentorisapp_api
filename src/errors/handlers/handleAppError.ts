import { FastifyError, FastifyReply } from "fastify";

import { buildErrorResponse } from "~/utils/errorResponse.util";

import { AppError } from "../base/AppError";

export function handleAppError(error: FastifyError, reply: FastifyReply) {
	if (!(error instanceof AppError)) return false;

	const response = buildErrorResponse(error);

	reply.status(error.statusCode).send(response);

	return true;
}

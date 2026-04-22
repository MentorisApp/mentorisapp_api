import { FastifyError, FastifyReply } from "fastify";

import { buildErrorResponse, errorCodeToHttpStatus } from "~/utils/errorResponse.util";

import { AppError } from "../base/AppError";

export function handleAppError(error: FastifyError, reply: FastifyReply) {
	if (!(error instanceof AppError)) return false;

	const errorResponse = buildErrorResponse(error);
	const status = errorCodeToHttpStatus[errorResponse.code];

	reply.status(status).send(errorResponse);

	return true;
}

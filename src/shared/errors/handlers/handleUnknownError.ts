import { FastifyReply } from "fastify";

import { ApiErrorCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { buildErrorResponse } from "~/utils/errorResponse.util";

export function handleUnknownError(_error: unknown, reply: FastifyReply) {
	return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
		buildErrorResponse({
			message: "Something went wrong",
			code: ApiErrorCode.INTERNAL_SERVER_ERROR,
		}),
	);
}

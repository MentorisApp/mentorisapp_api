import { FastifyReply } from "fastify";

import { ApiCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { buildErrorResponse } from "~/utils/errorResponse.util";

export function handleUnknownError(_error: unknown, reply: FastifyReply) {
	return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
		buildErrorResponse({
			message: "Internal Server Error",
			code: ApiCode.INTERNAL_SERVER_ERROR,
		}),
	);
}

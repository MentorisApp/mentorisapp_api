import { FastifyError, FastifyReply } from "fastify";

import { ApiCode } from "~/constants/apiCode.enum";
import { buildErrorResponse } from "~/utils/errorResponse.util";

const authCodes = [
	"FST_JWT_NO_AUTHORIZATION_IN_HEADER",
	"FST_JWT_AUTHORIZATION_TOKEN_EXPIRED",
	"FST_JWT_NO_AUTHORIZATION_IN_COOKIE",
	"FAST_JWT_EXPIRED",
];

export function handleAuthError(error: FastifyError, reply: FastifyReply) {
	if (!authCodes.includes(error.code)) return false;

	reply.status(401).send(
		buildErrorResponse({
			message: error.message,
			code: ApiCode.UNAUTHORIZED,
		}),
	);

	return true;
}

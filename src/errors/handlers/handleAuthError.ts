import { FastifyError, FastifyReply } from "fastify";

import { ApiCode } from "~/enums/apiCode.enum";
import { buildErrorResponse, errorCodeToHttpStatus } from "~/utils/errorResponse.util";

const authCodes = [
	"FST_JWT_NO_AUTHORIZATION_IN_HEADER",
	"FST_JWT_AUTHORIZATION_TOKEN_EXPIRED",
	"FST_JWT_NO_AUTHORIZATION_IN_COOKIE",
	"FAST_JWT_EXPIRED",
];

export function handleAuthError(error: FastifyError, reply: FastifyReply) {
	if (!authCodes.includes(error.code)) return false;

	const authError = buildErrorResponse({
		message: error.message,
		code: ApiCode.UNAUTHORIZED,
	});

	reply.status(errorCodeToHttpStatus[authError.code]).send(error);

	return true;
}

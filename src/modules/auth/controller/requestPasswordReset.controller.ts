import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import type { RequestPasswordResetRequest } from "./requestPasswordReset.schema";

type RequestPasswordResetHandlerRequest = FastifyRequest<{
	Body: RequestPasswordResetRequest;
}>;

export async function requestPasswordResetHandler(
	this: FastifyInstance,
	request: RequestPasswordResetHandlerRequest,
	reply: FastifyReply,
) {
	await this.authService.requestResetPassword(request.body.email);

	return reply.status(HttpStatus.ACCEPTED).send();
}

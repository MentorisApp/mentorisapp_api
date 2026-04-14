import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import type { ResendVerificationLinkRequest } from "./resendVerificationLink.schema";

type ResendVerificationLinkHandlerRequest = FastifyRequest<{
	Body: ResendVerificationLinkRequest;
}>;

export async function resendVerificationLinkHandler(
	this: FastifyInstance,
	request: ResendVerificationLinkHandlerRequest,
	reply: FastifyReply,
) {
	await this.authService.resendVerificationLink(request.body.email);

	reply.status(HttpStatus.ACCEPTED).send();
}

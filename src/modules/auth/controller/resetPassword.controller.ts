import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import type { ResetPasswordRequest } from "./resetPassword.schema";

type ResetPasswordHandlerRequest = FastifyRequest<{
	Body: ResetPasswordRequest;
}>;

export async function resetPasswordHandler(
	this: FastifyInstance,
	request: ResetPasswordHandlerRequest,
	reply: FastifyReply,
) {
	await this.authService.resetPassword(request.body);

	reply.status(HttpStatus.OK).send();
}

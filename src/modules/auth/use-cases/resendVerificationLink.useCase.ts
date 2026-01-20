import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { EmailSchema } from "~/utils/zod-shared.validator";

export async function resendVerificationLinkUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { email } = EmailSchema.parse(request.body);
	await this.authService.resendVerificationLink(email);

	reply.status(HttpStatus.ACCEPTED).send();
}

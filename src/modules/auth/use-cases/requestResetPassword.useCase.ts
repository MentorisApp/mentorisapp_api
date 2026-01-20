import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { EmailSchema } from "~/utils/zod-shared.validator";

export async function requestResetPasswordUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { email } = EmailSchema.parse(request.body);
	await this.authService.requestResetPassword(email);

	return reply.status(HttpStatus.ACCEPTED).send();
}

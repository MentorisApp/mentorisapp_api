import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { UserUpdatePasswordSchema } from "~/modules/user/user.validator";

export async function resetPasswordUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { password, token } = UserUpdatePasswordSchema.parse(request.body);
	await this.authService.resetPassword({ password, token });

	reply.status(HttpStatus.OK).send();
}

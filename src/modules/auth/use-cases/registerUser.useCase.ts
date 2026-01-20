import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { UserCreateSchema } from "~/modules/user/user.validator";

export async function registerUserUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const payload = UserCreateSchema.parse(request.body);
	await this.authService.register(payload);

	return reply.status(HttpStatus.CREATED).send();
}

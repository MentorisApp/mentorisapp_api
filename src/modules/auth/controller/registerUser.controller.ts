import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import type { RegisterUserRequest } from "./registerUser.schema";

type RegisterUserHandlerRequest = FastifyRequest<{
	Body: RegisterUserRequest;
}>;

export async function registerUserHandler(
	this: FastifyInstance,
	request: RegisterUserHandlerRequest,
	reply: FastifyReply,
) {
	await this.authService.register(request.body);

	return reply.status(HttpStatus.CREATED).send();
}

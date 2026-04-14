import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";

export async function getCurrentUserHandler(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	if (!request.userId) {
		throw new ForbiddenError("Missing authenticated user context");
	}

	const userProfile = await this.userService.getUserWithProfile(request.userId);

	reply.status(HttpStatus.OK).send(userProfile);
}

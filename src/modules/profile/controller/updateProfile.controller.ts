import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";

import type { UpdateProfileRequest } from "./updateProfile.schema";

type UpdateProfileHandlerRequest = FastifyRequest<{
	Body: UpdateProfileRequest;
}>;

export async function updateProfileHandler(
	this: FastifyInstance,
	request: UpdateProfileHandlerRequest,
	reply: FastifyReply,
) {
	if (!request.userId) {
		throw new ForbiddenError("Missing authenticated user context");
	}

	const profile = await this.profileService.updateProfile(request.body, request.userId);

	reply.status(HttpStatus.OK).send(profile);
}

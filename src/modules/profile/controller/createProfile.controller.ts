import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";

import type { CreateProfileRequest } from "./createProfile.schema";

type CreateProfileHandlerRequest = FastifyRequest<{
	Body: CreateProfileRequest;
}>;

export async function createProfileHandler(
	this: FastifyInstance,
	request: CreateProfileHandlerRequest,
	reply: FastifyReply,
) {
	if (!request.userId) {
		throw new ForbiddenError("Missing authenticated user context");
	}

	const profile = await this.profileService.createProfile(request.body, request.userId);

	reply.status(HttpStatus.CREATED).send(profile);
}

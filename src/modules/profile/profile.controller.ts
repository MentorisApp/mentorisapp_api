import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";

import type { CreateProfileRequest } from "./schemas/createProfile.schema";
import type { UpdateProfileRequest } from "./schemas/updateProfile.schema";

type CreateProfileHandlerRequest = FastifyRequest<{
	Body: CreateProfileRequest;
}>;

type UpdateProfileHandlerRequest = FastifyRequest<{
	Body: UpdateProfileRequest;
}>;

export function createProfileController(app: FastifyInstance) {
	return {
		async createProfile(request: CreateProfileHandlerRequest, reply: FastifyReply) {
			if (!request.userId) {
				throw new ForbiddenError("Missing authenticated user context");
			}

			const profile = await app.profileService.createProfile(request.body, request.userId);

			reply.status(HttpStatus.CREATED).send(profile);
		},

		async updateProfile(request: UpdateProfileHandlerRequest, reply: FastifyReply) {
			if (!request.userId) {
				throw new ForbiddenError("Missing authenticated user context");
			}

			const profile = await app.profileService.updateProfile(request.body, request.userId);

			reply.status(HttpStatus.OK).send(profile);
		},

		async getProfile(request: FastifyRequest, reply: FastifyReply) {
			if (!request.userId) {
				throw new ForbiddenError("Missing authenticated user context");
			}

			const profile = await app.profileService.getProfile(request.userId);

			reply.status(HttpStatus.OK).send(profile);
		},
	};
}

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

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
			const profile = await app.profileService.createProfile(request.body, request.userId);
			reply.status(HttpStatus.CREATED).send(profile);
		},

		async updateProfile(request: UpdateProfileHandlerRequest, reply: FastifyReply) {
			const profile = await app.profileService.updateProfile(request.body, request.userId);
			reply.status(HttpStatus.OK).send(profile);
		},

		async getProfile(request: FastifyRequest, reply: FastifyReply) {
			const profile = await app.profileService.getProfile(request.userId);
			reply
				.status(HttpStatus.OK)
				.success(profile, { message: "Profile created successfully", code: ApiCode.OK });
		},
	};
}

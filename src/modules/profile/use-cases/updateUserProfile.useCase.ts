import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { getUserIdFromToken } from "~/utils/auth.util";

import { ProfileUpdateSchema } from "../profile.validator";

export async function updateUserProfileUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = getUserIdFromToken(request);
	const payload = ProfileUpdateSchema.parse(request.body);
	const updatedProfile = await this.profileService.updateProfile(payload, userId);

	reply.status(HttpStatus.OK).send(updatedProfile);
}

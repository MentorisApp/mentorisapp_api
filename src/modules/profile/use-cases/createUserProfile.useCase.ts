import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { getUserIdFromToken } from "~/utils/auth.util";

import { ProfileCreateSchema } from "../profile.validator";

export async function createUserProfileUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = getUserIdFromToken(request);
	const payload = ProfileCreateSchema.parse(request.body);
	const newProfile = await this.profileService.createProfile(payload, userId);

	reply.status(HttpStatus.CREATED).send(newProfile);
}

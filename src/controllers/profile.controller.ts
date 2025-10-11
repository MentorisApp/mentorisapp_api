import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { createProfileService } from "~/services/profile.service";
import { getUserIdFromToken } from "~/utils/auth.util";
import { ProfileCreateSchema, ProfileUpdateSchema } from "~/validators/profile.validator";

export const profileController = (app: FastifyInstance) => {
	const profileService = createProfileService(app);

	return {
		create: async (request: FastifyRequest, reply: FastifyReply) => {
			const userId = getUserIdFromToken(request);
			const payload = ProfileCreateSchema.parse(request.body);
			const newProfile = await profileService.createProfile(payload, userId);

			reply.status(HttpStatus.CREATED).send(newProfile);
		},

		update: async (request: FastifyRequest, reply: FastifyReply) => {
			const userId = getUserIdFromToken(request);
			const payload = ProfileUpdateSchema.parse(request.body);
			const updatedProfile = await profileService.updateProfile(payload, userId);

			reply.status(HttpStatus.OK).send(updatedProfile);
		},
	};
};

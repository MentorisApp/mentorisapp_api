import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { createProfileService } from "~/services/profile.service";
import { getUserIdFromToken } from "~/utils/auth.util";
import { ProfileCreateSchema } from "~/validators/profile.validator";

export const useProfileController = (app: FastifyInstance) => {
	const profileService = createProfileService(app);

	const createProfile = async (request: FastifyRequest, reply: FastifyReply) => {
		const userId = getUserIdFromToken(request);
		const payload = ProfileCreateSchema.parse(request.body);
		const newProfile = await profileService.createProfile(payload, userId);

		reply.status(HttpStatus.CREATED);

		return newProfile;
	};

	return {
		createProfile,
	};
};

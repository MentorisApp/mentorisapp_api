import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { getUserIdFromToken } from "~/utils/auth.util";

export async function getUserProfileByUserIdUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = getUserIdFromToken(request);
	const profile = await this.profileService.getProfile(userId);

	reply.status(HttpStatus.OK).send(profile);
}

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { getUserIdFromToken } from "~/utils/auth.util";

import { ReviewCreateSchema } from "../reviews.validator";

export async function createReviewUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = getUserIdFromToken(request);
	const payload = ReviewCreateSchema.parse(request.body);
	const newProfile = await this.reviewService.createReview(payload, userId);
	reply.status(HttpStatus.CREATED).send(newProfile);
}

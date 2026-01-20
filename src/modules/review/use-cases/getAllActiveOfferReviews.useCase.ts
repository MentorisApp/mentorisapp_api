import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { NumberSchema } from "~/utils/zod-shared.validator";

export async function getAllActiveOfferReviewsUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { offerId } = NumberSchema("offerId").parse(request.params);
	const reviews = await this.reviewService.getAllActiveOfferReviews(offerId);
	reply.status(HttpStatus.OK).send(reviews);
}

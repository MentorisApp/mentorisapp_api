import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";

import type { CreateReviewRequest, CreateReviewResponse } from "./createReview.schema";
import type { GetOfferReviewsParams } from "./getOfferReviews.schema";

type CreateReviewHandlerRequest = FastifyRequest<{
	Body: CreateReviewRequest;
}>;

type GetOfferReviewsHandlerRequest = FastifyRequest<{
	Params: GetOfferReviewsParams;
}>;

export function createReviewController(app: FastifyInstance) {
	return {
		async createReview(request: CreateReviewHandlerRequest, reply: FastifyReply) {
			if (!request.userId) {
				throw new ForbiddenError("Missing authenticated user context");
			}

			const review = await app.reviewService.createReview(request.body, request.userId);
			const response: CreateReviewResponse = { id: review.id };

			reply.status(HttpStatus.CREATED).send(response);
		},

		async getOfferReviews(request: GetOfferReviewsHandlerRequest, reply: FastifyReply) {
			const reviews = await app.reviewService.getAllActiveOfferReviews(request.params.offerId);

			reply.status(HttpStatus.OK).send(reviews);
		},
	};
}

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/errors/generic/ForbiddenError";

import type { CreateReviewRequest } from "./schemas/createReview.schema";
import type { GetOfferReviewsParams } from "./schemas/getOfferReviews.schema";

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

			reply.status(HttpStatus.CREATED).success({ data: review, code: ApiCode.CREATED });
		},

		async getOfferReviews(request: GetOfferReviewsHandlerRequest, reply: FastifyReply) {
			const reviews = await app.reviewService.getAllActiveOfferReviews(request.params.offerId);

			reply.status(HttpStatus.OK).send(reviews);
		},
	};
}

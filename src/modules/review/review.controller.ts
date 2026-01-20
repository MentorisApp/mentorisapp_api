import { createReviewUseCase } from "./use-cases/createReview.useCase";
import { getAllActiveOfferReviewsUseCase } from "./use-cases/getAllActiveOfferReviews.useCase";

export const reviewController = () => {
	return {
		createReview: createReviewUseCase,
		getAllActiveOfferReviews: getAllActiveOfferReviewsUseCase,
		// delete: async (request: FastifyRequest, reply: FastifyReply) => {
		// 	const userId = getUserIdFromToken(request);
		// 	const reviewId = NumberSchema("reviewId").parse(request.params);

		// 	reply.status(HttpStatus.OK).send({ query: request.query, params: request.params, userId });
		// },
	};
};

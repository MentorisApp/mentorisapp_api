import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { createReviewService } from "~/services/review.service";
import { getUserIdFromToken } from "~/utils/auth.util";
import { ReviewCreateSchema } from "~/validators/reviews.validator";

export const reviewController = (app: FastifyInstance) => {
	const reviewService = createReviewService(app);

	return {
		create: async (request: FastifyRequest, reply: FastifyReply) => {
			const userId = getUserIdFromToken(request);
			const payload = ReviewCreateSchema.parse(request.body);
			const newProfile = await reviewService.createReview(payload, userId);
			reply.status(HttpStatus.CREATED).send(newProfile);
		},
		// delete: async (request: FastifyRequest, reply: FastifyReply) => {
		// 	const userId = getUserIdFromToken(request);
		// 	const reviewId = NumberSchema("reviewId").parse(request.params);

		// 	reply.status(HttpStatus.OK).send({ query: request.query, params: request.params, userId });
		// },
	};
};

import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createReviewRouteSchema } from "~/modules/review/schemas/createReview.schema";
import { getOfferReviewsRouteSchema } from "~/modules/review/schemas/getOfferReviews.schema";

export const reviewRoutes: FastifyPluginAsync = async (app) => {
	const reviewRoutesApp = app.withTypeProvider<ZodTypeProvider>();

	reviewRoutesApp.route({
		method: "POST",
		url: "",
		schema: createReviewRouteSchema,
		onRequest: app.authorize("USER"),
		handler: async function createReview(request, reply) {
			const review = await app.reviewService.createReview(request.body, request.userId);
			reply.created({ data: review });
		},
	});

	reviewRoutesApp.route({
		method: "GET",
		url: "/:offerId/reviews",
		schema: getOfferReviewsRouteSchema,
		handler: async function getOfferReviews(request, reply) {
			const reviews = await app.reviewService.getAllActiveOfferReviews(request.params.offerId);
			reply.ok({ data: reviews });
		},
	});
};

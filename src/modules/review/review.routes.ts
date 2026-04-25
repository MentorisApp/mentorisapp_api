import { FastifyPluginAsync } from "fastify";

import { App } from "~/types/app.types";

import {
	createReviewRouteSchema,
	getOfferReviewsRouteSchema,
} from "./schemas/route/review-routes.schema";

export const reviewRoutes: FastifyPluginAsync = async (app: App) => {
	app.route({
		method: "POST",
		url: "/:offerId/reviews",
		schema: createReviewRouteSchema,
		onRequest: app.authorize("USER"),
		handler: async function createReview(request, reply) {
			const review = await app.reviewService.createReview(request.body, request.userId);
			reply.created({ data: review });
		},
	});

	app.route({
		method: "GET",
		url: "/:offerId/reviews",
		schema: getOfferReviewsRouteSchema,
		handler: async function getOfferReviews(request, reply) {
			const reviews = await app.reviewService.getAllActiveOfferReviews(request.params.offerId);
			// TODO here we will use meta to paginate reviews
			reply.ok({ data: reviews });
		},
	});
};

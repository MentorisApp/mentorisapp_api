import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createReviewRouteSchema } from "~/modules/review/createReview.schema";
import { getOfferReviewsRouteSchema } from "~/modules/review/getOfferReviews.schema";
import { createReviewController } from "~/modules/review/review.controller";

export const reviewRoutes: FastifyPluginAsync = async (app) => {
	const reviewRoutesApp = app.withTypeProvider<ZodTypeProvider>();
	const reviewController = createReviewController(app);

	reviewRoutesApp.route({
		method: "POST",
		url: "/",
		schema: createReviewRouteSchema,
		onRequest: app.authorize("USER"),
		handler: reviewController.createReview,
	});

	reviewRoutesApp.route({
		method: "GET",
		url: "/:offerId/reviews",
		schema: getOfferReviewsRouteSchema,
		handler: reviewController.getOfferReviews,
	});
};

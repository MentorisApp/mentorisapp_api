import { FastifyInstance, RouteOptions } from "fastify";

import { reviewController } from "~/modules/review/review.controller";

export const reviewRoutes = (app: FastifyInstance) => {
	const controller = reviewController();

	// TODO Review hide/delete/softdelete
	return {
		prefix: "/reviews",
		routes: [
			{
				method: "POST",
				url: "/",
				handler: controller.createReview,
				onRequest: app.authorize(),
			},
			{
				method: "GET",
				url: "/:offerId/reviews",
				handler: controller.getAllActiveOfferReviews,
			},
		] as RouteOptions[],
	};
};

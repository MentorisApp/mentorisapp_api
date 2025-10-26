import { FastifyInstance, RouteOptions } from "fastify";
import { offerController } from "~/controllers/offer.controller";

export const offerRoutes = (app: FastifyInstance) => {
	const controller = offerController(app);

	return {
		prefix: "/offers",
		routes: [
			// TODO GET offer public api not by user id
			// TODO GET offer reviews private/public
			{
				method: "POST",
				url: "/",
				handler: controller.create,
				preHandler: app.authorize(),
			},
			{
				method: "PUT",
				url: "/",
				handler: controller.update,
				preHandler: app.authorize(),
			},
			{
				method: "GET",
				url: "/",
				handler: controller.getOfferByUserId,
				preHandler: app.authorize(),
			},
			{
				method: "GET",
				url: "/:offerId",
				handler: controller.getOfferByOfferId,
			},
			{
				method: "GET",
				url: "/:offerId/reviews",
				handler: controller.getAllActiveReviews,
			},
		] as RouteOptions[],
	};
};

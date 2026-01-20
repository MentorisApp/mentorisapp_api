import { FastifyInstance, RouteOptions } from "fastify";

import { offerController } from "~/modules/offer/offer.controller";

export const offerRoutes = (app: FastifyInstance) => {
	const controller = offerController();

	return {
		prefix: "/offers",
		routes: [
			// TODO GET offer public api not by user id
			// TODO GET offer reviews private/public
			{
				method: "POST",
				url: "/",
				handler: controller.createOffer,
				onRequest: app.authorize(),
			},
			{
				method: "PUT",
				url: "/",
				handler: controller.updateOffer,
				onRequest: app.authorize(),
			},
			{
				method: "GET",
				url: "/",
				handler: controller.getOfferByUserId,
				onRequest: app.authorize(),
			},
			{
				method: "GET",
				url: "/:offerId",
				handler: controller.getOfferByOfferId,
			},
		] as RouteOptions[],
	};
};

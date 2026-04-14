import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createOfferController } from "~/modules/offer/offer.controller";
import { createOfferRouteSchema } from "~/modules/offer/schemas/createOffer.schema";
import { getOfferRouteSchema } from "~/modules/offer/schemas/getOffer.schema";
import { getOfferByIdRouteSchema } from "~/modules/offer/schemas/getOfferById.schema";
import { updateOfferRouteSchema } from "~/modules/offer/schemas/updateOffer.schema";

export const offerRoutes: FastifyPluginAsync = async (app) => {
	const offerRoutesApp = app.withTypeProvider<ZodTypeProvider>();
	const authorizeUser = app.authorize("USER");
	const offerController = createOfferController(app);

	offerRoutesApp.route({
		method: "POST",
		url: "/",
		schema: createOfferRouteSchema,
		onRequest: authorizeUser,
		handler: offerController.createOffer,
	});

	offerRoutesApp.route({
		method: "PUT",
		url: "/",
		schema: updateOfferRouteSchema,
		onRequest: authorizeUser,
		handler: offerController.updateOffer,
	});

	offerRoutesApp.route({
		method: "GET",
		url: "/",
		schema: getOfferRouteSchema,
		onRequest: authorizeUser,
		handler: offerController.getOffer,
	});

	offerRoutesApp.route({
		method: "GET",
		url: "/:offerId",
		schema: getOfferByIdRouteSchema,
		handler: offerController.getOfferById,
	});
};

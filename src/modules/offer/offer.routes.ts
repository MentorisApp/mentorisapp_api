import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createOfferHandler } from "~/modules/offer/controller/createOffer.controller";
import { createOfferRouteSchema } from "~/modules/offer/controller/createOffer.schema";
import { getOfferHandler } from "~/modules/offer/controller/getOffer.controller";
import { getOfferRouteSchema } from "~/modules/offer/controller/getOffer.schema";
import { getOfferByIdHandler } from "~/modules/offer/controller/getOfferById.controller";
import { getOfferByIdRouteSchema } from "~/modules/offer/controller/getOfferById.schema";
import { updateOfferHandler } from "~/modules/offer/controller/updateOffer.controller";
import { updateOfferRouteSchema } from "~/modules/offer/controller/updateOffer.schema";

export const offerRoutes: FastifyPluginAsync = async (app) => {
	const offerRoutesApp = app.withTypeProvider<ZodTypeProvider>();
	const authorizeUser = app.authorize("USER");

	offerRoutesApp.route({
		method: "POST",
		url: "/",
		schema: createOfferRouteSchema,
		onRequest: authorizeUser,
		handler: createOfferHandler,
	});

	offerRoutesApp.route({
		method: "PUT",
		url: "/",
		schema: updateOfferRouteSchema,
		onRequest: authorizeUser,
		handler: updateOfferHandler,
	});

	offerRoutesApp.route({
		method: "GET",
		url: "/",
		schema: getOfferRouteSchema,
		onRequest: authorizeUser,
		handler: getOfferHandler,
	});

	offerRoutesApp.route({
		method: "GET",
		url: "/:offerId",
		schema: getOfferByIdRouteSchema,
		handler: getOfferByIdHandler,
	});
};

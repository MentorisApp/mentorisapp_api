import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createOfferRouteSchema } from "~/modules/offer/schemas/createOffer.schema";
import { getOfferByIdRouteSchema } from "~/modules/offer/schemas/getOfferById.schema";
import { updateOfferRouteSchema } from "~/modules/offer/schemas/updateOffer.schema";
import { createAuthGuards } from "~/utils/createAuthGuards";

export const offerRoutes: FastifyPluginAsync = async (app) => {
	const { authorizeUser } = createAuthGuards(app);
	const offerRoutesApp = app.withTypeProvider<ZodTypeProvider>();

	offerRoutesApp.route({
		method: "POST",
		url: "/",
		schema: createOfferRouteSchema,
		onRequest: authorizeUser,
		handler: async function createOffer(req, res) {
			const { id } = await app.offerService.createOffer(req.body, req.userId);
			res.created({ id });
		},
	});

	offerRoutesApp.route({
		method: "PUT",
		url: "/",
		schema: updateOfferRouteSchema,
		onRequest: authorizeUser,
		handler: async function updateOffer(req, res) {
			const offer = await app.offerService.updateOffer(req.body, req.userId);
			res.ok({ data: offer });
		},
	});

	offerRoutesApp.route({
		method: "GET",
		url: "/",
		onRequest: authorizeUser,
		handler: async function getOffer(req, res) {
			const offer = await app.offerService.getOfferByUserId(req.userId);
			res.ok({ data: offer });
		},
	});

	offerRoutesApp.route({
		method: "GET",
		url: "/:offerId",
		schema: getOfferByIdRouteSchema,
		handler: async function getOfferById(req, res) {
			const offer = await app.offerService.getOfferByOfferId(req.params.offerId);
			res.ok({ data: offer });
		},
	});
};

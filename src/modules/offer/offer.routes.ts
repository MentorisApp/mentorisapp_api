import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createOfferRouteSchema } from "~/modules/offer/schemas/createOffer.schema";
import { getOfferByIdRouteSchema } from "~/modules/offer/schemas/getOfferById.schema";
import { updateOfferRouteSchema } from "~/modules/offer/schemas/updateOffer.schema";
import { createAuthGuards } from "~/utils/createAuthGuards.util";

export const offerRoutes: FastifyPluginAsync = async (app) => {
	const { authorizeUser } = createAuthGuards(app);
	const offerRoutesApp = app.withTypeProvider<ZodTypeProvider>();

	offerRoutesApp.route({
		method: "POST",
		url: "",
		schema: createOfferRouteSchema,
		onRequest: authorizeUser,
		handler: async function createOffer(request, reply) {
			const offer = await app.offerService.createOffer(request.body, request.userId);
			reply.created({ data: offer.id });
		},
	});

	offerRoutesApp.route({
		method: "PUT",
		url: "",
		schema: updateOfferRouteSchema,
		onRequest: authorizeUser,
		handler: async function updateOffer(request, reply) {
			const offer = await app.offerService.updateOffer(request.body, request.userId);
			reply.ok({ data: offer });
		},
	});

	offerRoutesApp.route({
		method: "GET",
		url: "",
		onRequest: authorizeUser,
		handler: async function getMyOffer(request, reply) {
			const offer = await app.offerService.getOfferByUserId(request.userId);
			reply.ok({ data: offer });
		},
	});

	offerRoutesApp.route({
		method: "GET",
		url: "/:offerId",
		schema: getOfferByIdRouteSchema,
		handler: async function getOfferById(request, reply) {
			const offer = await app.offerService.getOfferByOfferId(request.params.offerId);
			reply.ok({ data: offer });
		},
	});
};

import { FastifyPluginAsync } from "fastify";

import { App } from "~/types/app.types";
import { createAuthGuards } from "~/utils/createAuthGuards.util";

import {
	createOfferRouteSchema,
	getMyOfferRouteSchema,
	getOfferByOfferIdRouteSchema,
	updateOfferRouteSchema,
} from "./schemas/route/offer-routes.schema";
import { reviewRoutes } from "../review/review.routes";

export const offerRoutes: FastifyPluginAsync = async (app: App) => {
	const { authorizeUser } = createAuthGuards(app);

	// reviews as submodule for offer routes
	app.register(reviewRoutes);

	app.route({
		method: "POST",
		url: "",
		schema: createOfferRouteSchema,
		onRequest: authorizeUser,
		handler: async function createOffer(request, reply) {
			const offer = await app.offerService.createOffer(request.body, request.userId);
			reply.created({ data: offer.id });
		},
	});

	app.route({
		method: "PUT",
		url: "",
		schema: updateOfferRouteSchema,
		onRequest: authorizeUser,
		handler: async function updateOffer(request, reply) {
			const offer = await app.offerService.updateOffer(request.body, request.userId);
			reply.ok({ data: offer });
		},
	});

	app.route({
		method: "GET",
		url: "/me",
		onRequest: authorizeUser,
		schema: getMyOfferRouteSchema,
		handler: async function getMyOffer(request, reply) {
			const offer = await app.offerService.getOfferByUserId(request.userId);
			reply.ok({ data: offer });
		},
	});

	app.route({
		method: "GET",
		url: "/:offerId",
		schema: getOfferByOfferIdRouteSchema,
		handler: async function (request, reply) {
			const offer = await app.offerService.getOfferByOfferId(request.params.offerId);
			reply.ok({ data: offer });
		},
	});
};

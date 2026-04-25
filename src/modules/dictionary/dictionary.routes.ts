import { FastifyPluginAsync } from "fastify";

import { App } from "~/types/app.types";

export const dictionaryRoutes: FastifyPluginAsync = async (app: App) => {
	app.route({
		method: "GET",
		url: "/cities",
		handler: async function getCities(_request, reply) {
			const cities = await app.dictionaryService.getCitiesDictionary();
			reply.ok({ data: cities });
		},
	});

	app.route({
		method: "GET",
		url: "/categories",
		handler: async function getCategories(_request, reply) {
			const categories = await app.dictionaryService.getCategoriesDictionary();
			reply.ok({ data: categories });
		},
	});
};

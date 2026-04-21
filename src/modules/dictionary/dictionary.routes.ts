import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export const dictionaryRoutes: FastifyPluginAsync = async (app) => {
	const dictionaryRoutesApp = app.withTypeProvider<ZodTypeProvider>();

	dictionaryRoutesApp.route({
		method: "GET",
		url: "/cities",
		handler: async function getCities(_request, reply) {
			const cities = await app.dictionaryService.getCitiesDictionary();
			reply.success({ data: cities });
		},
	});

	dictionaryRoutesApp.route({
		method: "GET",
		url: "/categories",
		handler: async function getCategories(_request, reply) {
			const categories = await app.dictionaryService.getCategoriesDictionary();
			reply.success({ data: categories });
		},
	});
};

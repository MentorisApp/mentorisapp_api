import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createDictionaryController } from "~/modules/dictionary/dictionary.controller";

export const dictionaryRoutes: FastifyPluginAsync = async (app) => {
	const dictionaryRoutesApp = app.withTypeProvider<ZodTypeProvider>();
	const dictionaryController = createDictionaryController(app);

	dictionaryRoutesApp.route({
		method: "GET",
		url: "/cities",
		handler: dictionaryController.getCities,
	});

	dictionaryRoutesApp.route({
		method: "GET",
		url: "/categories",
		handler: dictionaryController.getCategories,
	});
};

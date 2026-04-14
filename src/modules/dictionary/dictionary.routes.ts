import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createDictionaryController } from "~/modules/dictionary/dictionary.controller";
import { getCategoriesRouteSchema } from "~/modules/dictionary/schemas/getCategories.schema";
import { getCitiesRouteSchema } from "~/modules/dictionary/schemas/getCities.schema";

export const dictionaryRoutes: FastifyPluginAsync = async (app) => {
	const dictionaryRoutesApp = app.withTypeProvider<ZodTypeProvider>();
	const dictionaryController = createDictionaryController(app);

	dictionaryRoutesApp.route({
		method: "GET",
		url: "/cities",
		schema: getCitiesRouteSchema,
		handler: dictionaryController.getCities,
	});

	dictionaryRoutesApp.route({
		method: "GET",
		url: "/categories",
		schema: getCategoriesRouteSchema,
		handler: dictionaryController.getCategories,
	});
};

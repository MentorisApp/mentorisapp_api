import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { getCategoriesHandler } from "~/modules/dictionary/controller/getCategories.controller";
import { getCategoriesRouteSchema } from "~/modules/dictionary/controller/getCategories.schema";
import { getCitiesHandler } from "~/modules/dictionary/controller/getCities.controller";
import { getCitiesRouteSchema } from "~/modules/dictionary/controller/getCities.schema";

export const dictionaryRoutes: FastifyPluginAsync = async (app) => {
	const dictionaryRoutesApp = app.withTypeProvider<ZodTypeProvider>();

	dictionaryRoutesApp.route({
		method: "GET",
		url: "/cities",
		schema: getCitiesRouteSchema,
		handler: getCitiesHandler,
	});

	dictionaryRoutesApp.route({
		method: "GET",
		url: "/categories",
		schema: getCategoriesRouteSchema,
		handler: getCategoriesHandler,
	});
};

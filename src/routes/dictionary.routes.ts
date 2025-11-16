import { FastifyInstance, RouteOptions } from "fastify";

import { dictionaryController } from "~/controllers/dictionary.controller";

export const dictionaryRoutes = (app: FastifyInstance) => {
	const controller = dictionaryController(app);

	return {
		prefix: "/dictionaries",
		routes: [
			{
				method: "GET",
				url: "/cities",
				handler: controller.getAllCities,
				onRequest: app.authorize(),
			},
			{
				method: "GET",
				url: "/education-levels",
				handler: controller.getAllEducationLevels,
				onRequest: app.authorize(),
			},
			{
				method: "GET",
				url: "/countries",
				handler: controller.getAllCountries,
				onRequest: app.authorize(),
			},
			{
				method: "GET",
				url: "/genders",
				handler: controller.getAllGenders,
				onRequest: app.authorize(),
			},
			{
				method: "GET",
				url: "/categories",
				handler: controller.getAllCategories,
				onRequest: app.authorize(),
			},
		] as RouteOptions[],
	};
};

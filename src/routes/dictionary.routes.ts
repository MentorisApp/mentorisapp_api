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
			},
			{
				method: "GET",
				url: "/education-levels",
				handler: controller.getAllEducationLevels,
			},
			{
				method: "GET",
				url: "/countries",
				handler: controller.getAllCountries,
			},
			{
				method: "GET",
				url: "/genders",
				handler: controller.getAllGenders,
			},
			{
				method: "GET",
				url: "/categories",
				handler: controller.getAllCategories,
			},
		] as RouteOptions[],
	};
};

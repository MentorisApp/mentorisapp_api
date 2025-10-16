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
				preHandler: app.authorize(),
			},
			{
				method: "GET",
				url: "/education-levels",
				handler: controller.getAllEducationLevels,
				preHandler: app.authorize(),
			},
			{
				method: "GET",
				url: "/countries",
				handler: controller.getAllCountries,
				preHandler: app.authorize(),
			},
			{
				method: "GET",
				url: "/genders",
				handler: controller.getAllGenders,
				preHandler: app.authorize(),
			},
			{
				method: "GET",
				url: "/categories",
				handler: controller.getAllCategories,
				preHandler: app.authorize(),
			},
		] as RouteOptions[],
	};
};

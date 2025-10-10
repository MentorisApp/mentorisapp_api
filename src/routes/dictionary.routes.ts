import { FastifyPluginAsync } from "fastify";
import { dictionaryController } from "~/controllers/dictionary.controller";

export const dictionaryRoutes: FastifyPluginAsync = async (app) => {
	const controller = dictionaryController(app);

	// biome-ignore format: line wrap
	app.get(
		"/cities",
		{ preHandler: [app.authorizeAccess()] },
		controller.getAllCities,
	);

	// biome-ignore format: line wrap
	app.get(
		"/education-levels",
		{ preHandler: [app.authorizeAccess()] },
		controller.getAllEducationLevels,
	);

	// biome-ignore format: line wrap
	app.get(
		"/countries",
		{ preHandler: [app.authorizeAccess()] },
		controller.getAllCountries,
	);

	// biome-ignore format: line wrap
	app.get(
		"/genders",
		{ preHandler: [app.authorizeAccess()] },
		controller.getAllGenders,
	);
};

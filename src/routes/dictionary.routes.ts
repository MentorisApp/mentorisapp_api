import { FastifyPluginAsync } from "fastify";
import { useDictionaryController } from "~/controllers/dictionary.controller";

export const dictionaryRoutes: FastifyPluginAsync = async (app) => {
	const dictionaryController = useDictionaryController(app);

	app.get("/cities", { preHandler: [app.authorizeAccess()] }, dictionaryController.getAllCities);

	app.get(
		"/education-levels",
		{ preHandler: [app.authorizeAccess()] },
		dictionaryController.getAllEducationLevels,
	);

	app.get(
		"/countries",
		{ preHandler: [app.authorizeAccess()] },
		dictionaryController.getAllCountries,
	);

	app.get("/genders", { preHandler: [app.authorizeAccess()] }, dictionaryController.getAllGenders);
};

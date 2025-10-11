import { FastifyPluginAsync } from "fastify";
import { profileController } from "~/controllers/profile.controller";

export const profileRoutes: FastifyPluginAsync = async (app) => {
	const controller = profileController(app);

	// biome-ignore format: line wrap
	app.post(
		"/",
		{ preHandler: [app.authorizeAccess()] },
		controller.create
	);

	// biome-ignore format: line wrap
	app.put(
		"/",
		{ preHandler: [app.authorizeAccess()] },
		controller.update
	);
};

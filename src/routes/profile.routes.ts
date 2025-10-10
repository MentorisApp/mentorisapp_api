import { FastifyPluginAsync } from "fastify";
import { profileController } from "~/controllers/profile.controller";

export const profileRoutes: FastifyPluginAsync = async (app) => {
	const controller = profileController(app);

	// biome-ignore format: line wrap
	app.post(
		"/create",
		{ preHandler: [app.authorizeAccess()] },
		controller.create
	);
};

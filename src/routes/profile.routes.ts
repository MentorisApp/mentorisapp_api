import { FastifyPluginAsync } from "fastify";
import { useProfileController } from "~/controllers/profile.controller";

export const profileRoutes: FastifyPluginAsync = async (app) => {
	const profileController = useProfileController(app);

	app.post("/create", profileController.createProfile);
};

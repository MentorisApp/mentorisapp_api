import { FastifyPluginAsync } from "fastify";
import { useAuthController } from "~/controllers/auth.controller";

export const authRoutes: FastifyPluginAsync = async (app) => {
	const authController = useAuthController(app);

	app.post("/register", authController.register);

	app.post("/login", authController.login);

	app.post("/logout", authController.logout);

	app.post("/refresh", authController.refresh);
};

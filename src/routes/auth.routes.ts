import { FastifyPluginAsync } from "fastify";
import { authController } from "~/controllers/auth.controller";

export const authRoutes: FastifyPluginAsync = async (app) => {
	const controller = authController(app);

	app.post("/register", controller.register);
	app.post("/login", controller.login);
	app.post("/logout", controller.logout);
	app.post("/refresh", controller.refresh);
	app.get("/verify-account", controller.verifyAndLoginAccount);
};

import { FastifyPluginAsync } from "fastify";
import { useAuthController } from "~/controllers/auth.controller";

export const authRoutes: FastifyPluginAsync = async (app) => {
	const authControllers = useAuthController(app);

	app.post("/register", authControllers.register);

	app.post("/login", authControllers.login);

	app.post("/logout", authControllers.logout);

	app.post("/refresh", authControllers.refresh);
};

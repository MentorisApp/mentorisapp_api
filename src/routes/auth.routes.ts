import { FastifyInstance, RouteOptions } from "fastify";
import { authController } from "~/controllers/auth.controller";

export const authRoutes = (app: FastifyInstance) => {
	const controller = authController(app);

	return {
		prefix: "/auth",
		routes: [
			{
				method: "POST",
				url: "/register",
				handler: controller.register,
			},
			{
				method: "POST",
				url: "/login",
				handler: controller.login,
			},
			{
				method: "POST",
				url: "/logout",
				handler: controller.logout,
			},
			{
				method: "POST",
				url: "/refresh",
				handler: controller.refresh,
			},
			{
				method: "GET",
				url: "/verify-account",
				handler: controller.verifyAndLoginAccount,
			},
		] as RouteOptions[],
	};
};

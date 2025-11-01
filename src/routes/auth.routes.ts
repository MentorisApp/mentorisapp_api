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
			{
				method: "POST",
				url: "/request-reset-password",
				handler: controller.requestResetPassword,
			},
			{
				method: "POST",
				url: "/reset-password",
				handler: controller.resetPassword,
			},
			{
				method: "POST",
				url: "/resend-verification-link",
				handler: controller.resendVerificationLink,
			},
		] as RouteOptions[],
	};
};

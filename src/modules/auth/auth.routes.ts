import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createAuthController } from "~/modules/auth/auth.controller";
import { loginRouteSchema } from "~/modules/auth/schemas/login.schema";
import { registerUserRouteSchema } from "~/modules/auth/schemas/registerUser.schema";
import { requestPasswordResetRouteSchema } from "~/modules/auth/schemas/requestPasswordReset.schema";
import { resendVerificationLinkRouteSchema } from "~/modules/auth/schemas/resendVerificationLink.schema";
import { resetPasswordRouteSchema } from "~/modules/auth/schemas/resetPassword.schema";
import { verifyAccountRouteSchema } from "~/modules/auth/schemas/verifyAccount.schema";

export const authRoutes: FastifyPluginAsync = async (app) => {
	const authRoutesApp = app.withTypeProvider<ZodTypeProvider>();
	const authController = createAuthController(app);

	authRoutesApp.route({
		method: "POST",
		url: "/register",
		schema: registerUserRouteSchema,
		handler: authController.registerUser,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/login",
		schema: loginRouteSchema,
		handler: authController.login,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/logout",
		handler: authController.logout,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/refresh",
		handler: authController.refreshToken,
	});

	authRoutesApp.route({
		method: "GET",
		url: "/verify-account",
		schema: verifyAccountRouteSchema,
		handler: authController.verifyAccount,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/request-reset-password",
		schema: requestPasswordResetRouteSchema,
		handler: authController.requestPasswordReset,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/reset-password",
		schema: resetPasswordRouteSchema,
		handler: authController.resetPassword,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/resend-verification-link",
		schema: resendVerificationLinkRouteSchema,
		handler: authController.resendVerificationLink,
	});

	authRoutesApp.route({
		method: "GET",
		url: "/me",
		onRequest: app.authorize("USER"),
		handler: authController.getCurrentUser,
	});
};

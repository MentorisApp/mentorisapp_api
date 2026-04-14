import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { getCurrentUserHandler } from "~/modules/auth/controller/getCurrentUser.controller";
import { getCurrentUserRouteSchema } from "~/modules/auth/controller/getCurrentUser.schema";
import { loginHandler } from "~/modules/auth/controller/login.controller";
import { loginRouteSchema } from "~/modules/auth/controller/login.schema";
import { logoutHandler } from "~/modules/auth/controller/logout.controller";
import { logoutRouteSchema } from "~/modules/auth/controller/logout.schema";
import { refreshTokenHandler } from "~/modules/auth/controller/refreshToken.controller";
import { refreshTokenRouteSchema } from "~/modules/auth/controller/refreshToken.schema";
import { registerUserHandler } from "~/modules/auth/controller/registerUser.controller";
import { registerUserRouteSchema } from "~/modules/auth/controller/registerUser.schema";
import { requestPasswordResetHandler } from "~/modules/auth/controller/requestPasswordReset.controller";
import { requestPasswordResetRouteSchema } from "~/modules/auth/controller/requestPasswordReset.schema";
import { resendVerificationLinkHandler } from "~/modules/auth/controller/resendVerificationLink.controller";
import { resendVerificationLinkRouteSchema } from "~/modules/auth/controller/resendVerificationLink.schema";
import { resetPasswordHandler } from "~/modules/auth/controller/resetPassword.controller";
import { resetPasswordRouteSchema } from "~/modules/auth/controller/resetPassword.schema";
import { verifyAccountHandler } from "~/modules/auth/controller/verifyAccount.controller";
import { verifyAccountRouteSchema } from "~/modules/auth/controller/verifyAccount.schema";

export const authRoutes: FastifyPluginAsync = async (app) => {
	const authRoutesApp = app.withTypeProvider<ZodTypeProvider>();

	authRoutesApp.route({
		method: "POST",
		url: "/register",
		schema: registerUserRouteSchema,
		handler: registerUserHandler,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/login",
		schema: loginRouteSchema,
		handler: loginHandler,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/logout",
		schema: logoutRouteSchema,
		handler: logoutHandler,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/refresh",
		schema: refreshTokenRouteSchema,
		handler: refreshTokenHandler,
	});

	authRoutesApp.route({
		method: "GET",
		url: "/verify-account",
		schema: verifyAccountRouteSchema,
		handler: verifyAccountHandler,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/request-reset-password",
		schema: requestPasswordResetRouteSchema,
		handler: requestPasswordResetHandler,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/reset-password",
		schema: resetPasswordRouteSchema,
		handler: resetPasswordHandler,
	});

	authRoutesApp.route({
		method: "POST",
		url: "/resend-verification-link",
		schema: resendVerificationLinkRouteSchema,
		handler: resendVerificationLinkHandler,
	});

	authRoutesApp.route({
		method: "GET",
		url: "/me",
		schema: getCurrentUserRouteSchema,
		onRequest: app.authorize("USER"),
		handler: getCurrentUserHandler,
	});
};

import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { env } from "~/env";
import { loginRouteSchema } from "~/modules/auth/schemas/login.schema";
import { registerUserRouteSchema } from "~/modules/auth/schemas/registerUser.schema";
import type { RequestPasswordResetRequest } from "~/modules/auth/schemas/requestPasswordReset.schema";
import { requestPasswordResetRouteSchema } from "~/modules/auth/schemas/requestPasswordReset.schema";
import type { ResendVerificationLinkRequest } from "~/modules/auth/schemas/resendVerificationLink.schema";
import { resendVerificationLinkRouteSchema } from "~/modules/auth/schemas/resendVerificationLink.schema";
import type { ResetPasswordRequest } from "~/modules/auth/schemas/resetPassword.schema";
import { resetPasswordRouteSchema } from "~/modules/auth/schemas/resetPassword.schema";
import type { VerifyAccountQuery } from "~/modules/auth/schemas/verifyAccount.schema";
import { verifyAccountRouteSchema } from "~/modules/auth/schemas/verifyAccount.schema";
import { getSignedCookieOrThrow } from "~/utils/cookie.util";
import { parseDurationMs } from "~/utils/datetime.util";

export const authRoutes: FastifyPluginAsync = async (app) => {
	const authorizeUser = app.authorize("USER");
	const authRoutesApp = app.withTypeProvider<ZodTypeProvider>();

	authRoutesApp.route({
		method: "POST",
		url: "/register",
		schema: registerUserRouteSchema,
		handler: async function registerUser(request, reply) {
			const email = await app.authService.register(request.body);
			reply.noContent({ message: `Verification email sent to ${email}` });
		},
	});

	authRoutesApp.route({
		method: "POST",
		url: "/login",
		schema: loginRouteSchema,
		handler: async function login(request, reply) {
			const { accessToken, refreshToken } = await app.authService.login(request.body);

			reply
				.setCookie("accessToken", accessToken, {
					maxAge: parseDurationMs(env.JWT_ACCESS_TOKEN_EXPIRES_IN),
				})
				.setCookie("refreshToken", refreshToken, {
					maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
				});

			reply.noContent({ message: "Logged in successfully" });
		},
	});

	authRoutesApp.route({
		method: "POST",
		url: "/logout",
		onRequest: authorizeUser,
		handler: async function logout(request, reply) {
			const refreshToken = getSignedCookieOrThrow(app, request.cookies.refreshToken, {
				missingMessage: "No refresh token cookie",
				invalidMessage: "Invalid refresh token cookie",
			});

			const { cleared } = await app.authService.logout(refreshToken);

			if (cleared) {
				reply.clearCookie("refreshToken").clearCookie("accessToken");
				return reply.noContent({ message: "Logged out" });
			}

			return reply.noContent();
		},
	});

	authRoutesApp.route({
		method: "POST",
		url: "/refresh",
		handler: async function refreshToken(request, reply) {
			const refreshToken = getSignedCookieOrThrow(app, request.cookies.refreshToken, {
				missingMessage: "No refresh token in cookie",
				invalidMessage: "Refresh token is not valid",
			});

			const { accessToken, refreshToken: nextRefreshToken } =
				await app.authService.refresh(refreshToken);

			reply.setCookie("refreshToken", nextRefreshToken, {
				maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
			});

			reply.ok({ data: accessToken });
		},
	});

	authRoutesApp.route({
		method: "GET",
		url: "/verify-account",
		schema: verifyAccountRouteSchema,
		handler: async function verifyAccount(request, reply) {
			const query = request.query as VerifyAccountQuery;
			const { accessToken, refreshToken } = await app.authService.verifyUserAndLogin(query.token);

			reply
				.setCookie("accessToken", accessToken, {
					maxAge: parseDurationMs(env.JWT_ACCESS_TOKEN_EXPIRES_IN),
				})
				.setCookie("refreshToken", refreshToken, {
					maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
				});

			reply.ok({ data: null, message: "Verified successfully" });
		},
	});

	authRoutesApp.route({
		method: "POST",
		url: "/request-reset-password",
		schema: requestPasswordResetRouteSchema,
		handler: async function requestPasswordReset(request, reply) {
			const body = request.body as RequestPasswordResetRequest;
			await app.authService.requestResetPassword(body.email);
			reply.ok({ data: null, message: `A password reset email was sent to ${body.email}` });
		},
	});

	authRoutesApp.route({
		method: "POST",
		url: "/reset-password",
		schema: resetPasswordRouteSchema,
		handler: async function resetPassword(request, reply) {
			await app.authService.resetPassword(request.body as ResetPasswordRequest);
			reply.ok({ data: null });
		},
	});

	authRoutesApp.route({
		method: "POST",
		url: "/resend-verification-link",
		schema: resendVerificationLinkRouteSchema,
		handler: async function resendVerificationLink(request, reply) {
			const body = request.body as ResendVerificationLinkRequest;
			await app.authService.resendVerificationLink(body.email);
			reply.ok({ data: null, message: `Verification link sent to ${body.email}` });
		},
	});

	authRoutesApp.route({
		method: "GET",
		url: "/me",
		onRequest: authorizeUser,
		handler: async function getCurrentUser(request, reply) {
			const userProfile = await app.userService.getUserWithProfile(request.userId);
			reply.ok({ data: userProfile });
		},
	});
};

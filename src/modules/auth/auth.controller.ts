import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { env } from "~/env";
import { getSignedCookieOrThrow } from "~/utils/cookie.util";
import { parseDurationMs } from "~/utils/datetime.util";

import type { LoginRequest } from "./schemas/login.schema";
import type { RegisterUserRequest } from "./schemas/registerUser.schema";
import type { RequestPasswordResetRequest } from "./schemas/requestPasswordReset.schema";
import type { ResendVerificationLinkRequest } from "./schemas/resendVerificationLink.schema";
import type { ResetPasswordRequest } from "./schemas/resetPassword.schema";
import type { VerifyAccountQuery } from "./schemas/verifyAccount.schema";

type LoginHandlerRequest = FastifyRequest<{
	Body: LoginRequest;
}>;

type RegisterUserHandlerRequest = FastifyRequest<{
	Body: RegisterUserRequest;
}>;

type RequestPasswordResetHandlerRequest = FastifyRequest<{
	Body: RequestPasswordResetRequest;
}>;

type ResendVerificationLinkHandlerRequest = FastifyRequest<{
	Body: ResendVerificationLinkRequest;
}>;

type ResetPasswordHandlerRequest = FastifyRequest<{
	Body: ResetPasswordRequest;
}>;

type VerifyAccountHandlerRequest = FastifyRequest<{
	Querystring: VerifyAccountQuery;
}>;

export function createAuthController(app: FastifyInstance) {
	return {
		async registerUser(request: RegisterUserHandlerRequest, reply: FastifyReply) {
			await app.authService.register(request.body);

			return reply.status(HttpStatus.CREATED).send();
		},

		async login(request: LoginHandlerRequest, reply: FastifyReply) {
			const { accessToken, refreshToken } = await app.authService.login(request.body);

			reply
				.setCookie("accessToken", accessToken, {
					maxAge: parseDurationMs(env.JWT_ACCESS_TOKEN_EXPIRES_IN),
				})
				.setCookie("refreshToken", refreshToken, {
					maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
				})
				.status(HttpStatus.OK)
				.success(null, { message: "Logged in successfully" });
		},

		async logout(request: FastifyRequest, reply: FastifyReply) {
			const refreshToken = getSignedCookieOrThrow(app, request.cookies.refreshToken, {
				missingMessage: "No refresh token cookie",
				invalidMessage: "Invalid refresh token cookie",
			});

			const { cleared } = await app.authService.logout(refreshToken);

			if (cleared) {
				return reply
					.clearCookie("refreshToken")
					.clearCookie("accessToken")
					.status(HttpStatus.NO_CONTENT)
					.success();
			}

			return reply.status(HttpStatus.BAD_REQUEST).send();
		},

		async refreshToken(request: FastifyRequest, reply: FastifyReply) {
			const refreshToken = getSignedCookieOrThrow(app, request.cookies.refreshToken, {
				missingMessage: "No refresh token in cookie",
				invalidMessage: "Refresh token is not valid",
			});

			const { accessToken, refreshToken: nextRefreshToken } =
				await app.authService.refresh(refreshToken);

			reply
				.status(HttpStatus.OK)
				.setCookie("refreshToken", nextRefreshToken, {
					maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
				})
				.success({ accessToken });
		},

		async verifyAccount(request: VerifyAccountHandlerRequest, reply: FastifyReply) {
			const { accessToken, refreshToken } = await app.authService.verifyUserAndLogin(
				request.query.token,
			);

			reply
				.setCookie("accessToken", accessToken, {
					maxAge: parseDurationMs(env.JWT_ACCESS_TOKEN_EXPIRES_IN),
				})
				.setCookie("refreshToken", refreshToken, {
					maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
				})
				.status(HttpStatus.OK)
				.send({ message: "Logged in successfully" });
		},

		async requestPasswordReset(request: RequestPasswordResetHandlerRequest, reply: FastifyReply) {
			await app.authService.requestResetPassword(request.body.email);

			return reply.status(HttpStatus.OK).send();
		},

		async resetPassword(request: ResetPasswordHandlerRequest, reply: FastifyReply) {
			await app.authService.resetPassword(request.body);

			reply.status(HttpStatus.OK).send();
		},

		async resendVerificationLink(
			request: ResendVerificationLinkHandlerRequest,
			reply: FastifyReply,
		) {
			await app.authService.resendVerificationLink(request.body.email);

			reply.status(HttpStatus.OK).send();
		},

		async getCurrentUser(request: FastifyRequest, reply: FastifyReply) {
			const userProfile = await app.userService.getUserWithProfile(request.userId);

			reply.status(HttpStatus.OK).send(userProfile);
		},
	};
}

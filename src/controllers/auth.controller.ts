import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { BadRequestError } from "~/domain/errors/BadRequestError";
import { env } from "~/env";
import { createAuthService } from "~/services/auth.service";
import { parseDurationMs } from "~/utils/datetime.util";
import { UserCreateSchema, UserUpdatePasswordSchema } from "~/validators/user.validator";
import { EmailSchema, UuidQuerySchema } from "~/validators/zod-shared.validator";

export const authController = (app: FastifyInstance) => {
	const authService = createAuthService(app);

	return {
		verifyAndLoginAccount: async (request: FastifyRequest, reply: FastifyReply) => {
			const { token: verificationToken } = UuidQuerySchema("token").parse(request.query);
			const { accessToken, refreshToken } = await authService.verifyUserAndLogin(verificationToken);

			reply.setCookie("refreshToken", refreshToken, {
				maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
			});

			return reply.status(HttpStatus.OK).send({
				accessToken,
			});
		},
		register: async (request: FastifyRequest, reply: FastifyReply) => {
			const payload = UserCreateSchema.parse(request.body);
			await authService.register(payload);

			return reply.status(HttpStatus.CREATED).send();
		},
		login: async (request: FastifyRequest, reply: FastifyReply) => {
			const payload = UserCreateSchema.parse(request.body);
			const { accessToken, refreshToken } = await authService.login(payload);

			reply
				.status(HttpStatus.OK)
				.setCookie("refreshToken", refreshToken, {
					maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
				})
				.send({ accessToken });
		},
		logout: async (request: FastifyRequest, reply: FastifyReply) => {
			const refreshTokenCookie = request.cookies.refreshToken;

			if (!refreshTokenCookie) {
				throw new BadRequestError("No refresh token cookie");
			}

			const { valid, value: token } = app.unsignCookie(refreshTokenCookie);

			if (!valid) {
				throw new BadRequestError("Invalid refresh token cookie");
			}

			const { cleared } = await authService.logout(token);

			if (cleared) {
				return reply.clearCookie("refreshToken").status(HttpStatus.NO_CONTENT).send();
			}

			return reply.status(HttpStatus.BAD_REQUEST).send();
		},
		refresh: async (request: FastifyRequest, reply: FastifyReply) => {
			const oldRefreshTokenCookie = request.cookies.refreshToken;

			if (!oldRefreshTokenCookie) {
				throw new BadRequestError("No refresh token in cookie");
			}

			const { valid, value: oldRefreshToken } = app.unsignCookie(oldRefreshTokenCookie);

			if (!valid) {
				throw new BadRequestError("Refresh token is not valid");
			}

			const { accessToken, refreshToken } = await authService.refresh(oldRefreshToken);

			reply
				.status(HttpStatus.OK)
				.setCookie("refreshToken", refreshToken, {
					maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
				})
				.send({ accessToken });
		},
		requestResetPassword: async (request: FastifyRequest, reply: FastifyReply) => {
			const { email } = EmailSchema.parse(request.body);
			await authService.requestResetPassword(email);

			return reply.status(HttpStatus.ACCEPTED).send();
		},
		resetPassword: async (request: FastifyRequest, reply: FastifyReply) => {
			const { password, token } = UserUpdatePasswordSchema.parse(request.body);
			await authService.resetPassword({ password, token });

			reply.status(HttpStatus.OK).send();
		},
		resendVerificationLink: async (request: FastifyRequest, reply: FastifyReply) => {
			const { email } = EmailSchema.parse(request.body);
			await authService.resendVerificationLink(email);

			reply.status(HttpStatus.ACCEPTED).send();
		},
	};
};

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { env } from "~/env";
import { createAuthService } from "~/services/auth.service";
import { parseDurationMs } from "~/utils/datetime.util";
import { UserCreateSchema } from "~/validators/user.validator";
import { UuidQuerySchema } from "~/validators/zod-shared.validator";

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
				return reply.status(HttpStatus.BAD_REQUEST).send({ error: "No refresh token cookie" });
			}

			const { valid, value: token } = app.unsignCookie(refreshTokenCookie);

			if (!valid) {
				return reply.status(HttpStatus.BAD_REQUEST).send({ error: "Invalid refresh token cookie" });
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
				throw new Error("NO REFRESH TOKEN IN COOKIE");
			}

			const { valid, value: oldRefreshToken } = app.unsignCookie(oldRefreshTokenCookie);

			if (!valid) {
				throw new Error("REFRESH TOKEN COOKIE NOT VALID");
			}

			const { accessToken, refreshToken } = await authService.refresh(oldRefreshToken);

			reply
				.status(HttpStatus.OK)
				.setCookie("refreshToken", refreshToken, {
					maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
				})
				.send({ accessToken });
		},
	};
};

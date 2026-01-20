import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { BadRequestError } from "~/domain/errors/BadRequestError";
import { env } from "~/env";
import { parseDurationMs } from "~/utils/datetime.util";

export async function refreshTokenUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const oldRefreshTokenCookie = request.cookies.refreshToken;

	if (!oldRefreshTokenCookie) {
		throw new BadRequestError("No refresh token in cookie");
	}

	const { valid, value: oldRefreshToken } = this.unsignCookie(oldRefreshTokenCookie);

	if (!valid) {
		throw new BadRequestError("Refresh token is not valid");
	}

	const { accessToken, refreshToken } = await this.authService.refresh(oldRefreshToken);

	reply
		.status(HttpStatus.OK)
		.setCookie("refreshToken", refreshToken, {
			maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
		})
		.send({ accessToken });
}

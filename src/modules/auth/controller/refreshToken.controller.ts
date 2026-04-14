import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { env } from "~/env";
import { getSignedCookieOrThrow } from "~/utils/cookie.util";
import { parseDurationMs } from "~/utils/datetime.util";

export async function refreshTokenHandler(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const refreshToken = getSignedCookieOrThrow(this, request.cookies.refreshToken, {
		missingMessage: "No refresh token in cookie",
		invalidMessage: "Refresh token is not valid",
	});

	const { accessToken, refreshToken: nextRefreshToken } =
		await this.authService.refresh(refreshToken);

	reply
		.status(HttpStatus.OK)
		.setCookie("refreshToken", nextRefreshToken, {
			maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
		})
		.send({ accessToken });
}

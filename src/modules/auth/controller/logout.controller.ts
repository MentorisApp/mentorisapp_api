import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { getSignedCookieOrThrow } from "~/utils/cookie.util";

export async function logoutHandler(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const refreshToken = getSignedCookieOrThrow(this, request.cookies.refreshToken, {
		missingMessage: "No refresh token cookie",
		invalidMessage: "Invalid refresh token cookie",
	});

	const { cleared } = await this.authService.logout(refreshToken);

	if (cleared) {
		return reply
			.clearCookie("refreshToken")
			.clearCookie("accessToken")
			.status(HttpStatus.NO_CONTENT)
			.send();
	}

	return reply.status(HttpStatus.BAD_REQUEST).send();
}

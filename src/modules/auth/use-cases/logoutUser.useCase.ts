import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { BadRequestError } from "~/domain/errors/BadRequestError";

export async function logoutUserUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const refreshTokenCookie = request.cookies.refreshToken;

	if (!refreshTokenCookie) {
		throw new BadRequestError("No refresh token cookie");
	}

	const { valid, value: token } = this.unsignCookie(refreshTokenCookie);

	if (!valid) {
		throw new BadRequestError("Invalid refresh token cookie");
	}

	const { cleared } = await this.authService.logout(token);

	if (cleared) {
		return reply.clearCookie("refreshToken").status(HttpStatus.NO_CONTENT).send();
	}

	return reply.status(HttpStatus.BAD_REQUEST).send();
}

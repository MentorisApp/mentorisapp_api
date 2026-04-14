import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { env } from "~/env";
import { parseDurationMs } from "~/utils/datetime.util";

import type { VerifyAccountQuery } from "./verifyAccount.schema";

type VerifyAccountHandlerRequest = FastifyRequest<{
	Querystring: VerifyAccountQuery;
}>;

export async function verifyAccountHandler(
	this: FastifyInstance,
	request: VerifyAccountHandlerRequest,
	reply: FastifyReply,
) {
	const { accessToken, refreshToken } = await this.authService.verifyUserAndLogin(
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
}

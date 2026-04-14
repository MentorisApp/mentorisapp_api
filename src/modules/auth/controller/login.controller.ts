import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { env } from "~/env";
import { parseDurationMs } from "~/utils/datetime.util";

import type { LoginRequest } from "./login.schema";

type LoginHandlerRequest = FastifyRequest<{
	Body: LoginRequest;
}>;

export async function loginHandler(
	this: FastifyInstance,
	request: LoginHandlerRequest,
	reply: FastifyReply,
) {
	const { accessToken, refreshToken } = await this.authService.login(request.body);

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

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { env } from "~/env";
import { UserCreateSchema } from "~/modules/user/user.validator";
import { parseDurationMs } from "~/utils/datetime.util";

export async function loginUserUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const payload = UserCreateSchema.parse(request.body);
	const { accessToken, refreshToken } = await this.authService.login(payload);

	const accessTokenMaxAge = parseDurationMs(env.JWT_ACCESS_TOKEN_EXPIRES_IN);
	const refreshTokenMaxAge = parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN);

	reply
		.setCookie("accessToken", accessToken, {
			maxAge: accessTokenMaxAge,
		})
		.setCookie("refreshToken", refreshToken, {
			maxAge: refreshTokenMaxAge,
		})
		.status(HttpStatus.OK)
		.send({ message: "Logged in successfully" });
}

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { env } from "~/env";
import { parseDurationMs } from "~/utils/datetime.util";
import { UuidQuerySchema } from "~/utils/zod-shared.validator";

export async function verifyAndLoginUserUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { token: verificationToken } = UuidQuerySchema("token").parse(request.query);
	const { accessToken, refreshToken } =
		await this.authService.verifyUserAndLogin(verificationToken);

	reply.setCookie("refreshToken", refreshToken, {
		maxAge: parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN),
	});

	return reply.status(HttpStatus.OK).send({
		accessToken,
	});
}

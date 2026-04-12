import fastifyJwt from "@fastify/jwt";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { Role } from "~/constants/roles";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";
import { env } from "~/env";

const authHandler: FastifyPluginAsync = async (app) => {
	app.register(fastifyJwt, {
		secret: env.JWT_SECRET,
		sign: { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN },
		cookie: {
			cookieName: "accessToken",
			signed: true,
		},
	});

	app.decorate(
		"authorize",
		(role: Role) => async (request: FastifyRequest, _reply: FastifyReply) => {
			// Skip verifying JWT on route pre handlers, only in private routes entry

			if (!request.user) {
				await request.jwtVerify();
			}

			const user = request.user;

			if (!user) {
				throw new ForbiddenError("Missing user payload in JWT");
			}

			if (user.role !== role) {
				throw new ForbiddenError();
			}
		},
	);
};

export const authPlugin = fp(authHandler, {
	name: "auth-plugin",
});

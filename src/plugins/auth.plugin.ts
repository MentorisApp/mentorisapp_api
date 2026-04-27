import fastifyJwt from "@fastify/jwt";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import z from "zod";

import { env } from "~/env";
import { Role } from "~/modules/auth/auth.constants";
import { ForbiddenError } from "~/shared/errors/generic/ForbiddenError";
import { UnauthorizedError } from "~/shared/errors/generic/UnauthorizedError";

const UserIdSchema = z.coerce
	.number("userId in token payload must be a valid number")
	.int("userId in token payload must be an integer")
	.positive("userId in token payload must be a positive number");

export const getUserIdFromToken = (request: FastifyRequest): number => {
	const sub = request.user?.sub;
	const result = UserIdSchema.parse(sub);
	return result;
};

const authHandler: FastifyPluginAsync = async (app) => {
	app.register(fastifyJwt, {
		secret: env.JWT_SECRET,
		sign: { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN },
		cookie: {
			cookieName: "accessToken",
			signed: true,
		},
	});

	app.decorateRequest("userId");

	app.decorate(
		"authorize",
		(role: Role) => async (request: FastifyRequest, _reply: FastifyReply) => {
			// Skip verifying JWT on route pre handlers, only in private routes entry
			if (!request.user) await request.jwtVerify();

			const user = request.user;

			if (!user) throw new UnauthorizedError();

			request.userId = getUserIdFromToken(request);

			if (user.role !== role) throw new ForbiddenError();
		},
	);
};

export const authPlugin = fp(authHandler, {
	name: "auth-plugin",
});

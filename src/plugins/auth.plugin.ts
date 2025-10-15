import fastifyJwt from "@fastify/jwt";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { Permission } from "~/constants/permissions";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";
import { env } from "~/env";

const authHandler: FastifyPluginAsync = async (app) => {
	app.register(fastifyJwt, {
		secret: env.JWT_SECRET,
		sign: { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN },
	});

	app.decorate(
		"authorize",
		(requiredPermissions: Permission[] = []) =>
			async (request: FastifyRequest, _reply: FastifyReply) => {
				// Skip verifying JWT on route pre handlers, only in private routes entry
				if (!request.user) {
					await request.jwtVerify();
				}

				const user = request.user;

				if (!user) {
					throw new ForbiddenError("Missing user payload in JWT");
				}

				// Parse Injected user data from JWt in request object and check permissions per route
				const hasAllPermissions = requiredPermissions.every((perm) =>
					user.permissions?.includes(perm),
				);

				if (!hasAllPermissions) {
					throw new ForbiddenError();
				}
			},
	);
};

export const authPlugin = fp(authHandler, {
	name: "auth-plugin",
});

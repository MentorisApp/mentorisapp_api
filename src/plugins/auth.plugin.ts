import fastifyJwt from "@fastify/jwt";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";
import { env } from "~/env";
import { AuthOptions } from "~/types/fastify";

const authHandler: FastifyPluginAsync = async (app) => {
	app.register(fastifyJwt, {
		secret: env.JWT_SECRET,
		sign: { expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN },
	});

	app.decorate("authorizeAccess", (options?: AuthOptions) => {
		return async (request: FastifyRequest, _reply: FastifyReply) => {
			await request.jwtVerify();

			const user = request.user;

			if (options?.all) {
				const hasAll = options.all.every((perm) => user.permissionIds?.includes(perm));
				if (!hasAll) {
					throw new ForbiddenError();
				}
			}

			if (options?.any) {
				const hasAny = options.any.some((perm) => user.permissionIds?.includes(perm));
				if (!hasAny) {
					throw new ForbiddenError();
				}
			}
		};
	});
};

export const authPlugin = fp(authHandler, {
	name: "auth-plugin",
});

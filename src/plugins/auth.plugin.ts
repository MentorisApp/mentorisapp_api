import fastifyJwt from "@fastify/jwt";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { env } from "~/env";
import { AuthOptions } from "~/types/fastify";

const authHandler: FastifyPluginAsync = async (app) => {
	app.register(fastifyJwt, {
		secret: env.JWT_SECRET,
		sign: { expiresIn: "15m" },
	});

	app.decorate("authorizeAccess", (options?: AuthOptions) => {
		return async (request: FastifyRequest, reply: FastifyReply) => {
			await request.jwtVerify();

			const user = request.user;
			// TODO throw custom error
			if (options?.all) {
				const hasAll = options.all.every((perm) => user.permissionIds?.includes(perm));
				if (!hasAll) {
					return reply.code(403).send({ message: "Forbidden: missing required permissions" });
				}
			}

			if (options?.any) {
				const hasAny = options.any.some((perm) => user.permissionIds?.includes(perm));
				if (!hasAny) {
					return reply.code(403).send({ message: "Forbidden: requires at least one permission" });
				}
			}
		};
	});
};

export const authPlugin = fp(authHandler, {
	name: "auth-plugin",
});

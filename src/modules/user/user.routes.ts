import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createAuthGuards } from "~/utils/createAuthGuards.util";

export const userRoutes: FastifyPluginAsync = async (app) => {
	const { authorizeUser } = createAuthGuards(app);
	const userRoutesApp = app.withTypeProvider<ZodTypeProvider>();

	userRoutesApp.route({
		method: "GET",
		url: "/me",
		onRequest: authorizeUser,
		// TODO schema
		handler: async function getCurrentUser(request, reply) {
			const userProfile = await app.userService.getUserWithProfile(request.userId);
			reply.ok({ data: userProfile });
		},
	});
};

import { FastifyPluginAsync } from "fastify";

import { App } from "~/types/app.types";
import { createAuthGuards } from "~/utils/createAuthGuards.util";

import { getCurrentUserRouteSchema } from "./schema/route/user-routes.schema";

export const userRoutes: FastifyPluginAsync = async (app: App) => {
	const { authorizeUser } = createAuthGuards(app);

	app.route({
		method: "GET",
		url: "/me",
		onRequest: authorizeUser,
		schema: getCurrentUserRouteSchema,
		handler: async function getCurrentUser(request, reply) {
			const userProfile = await app.userService.getUserWithProfile(request.userId);
			reply.ok({ data: userProfile });
		},
	});
};

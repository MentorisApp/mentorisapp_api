import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createProfileHandler } from "~/modules/profile/controller/createProfile.controller";
import { createProfileRouteSchema } from "~/modules/profile/controller/createProfile.schema";
import { getProfileHandler } from "~/modules/profile/controller/getProfile.controller";
import { getProfileRouteSchema } from "~/modules/profile/controller/getProfile.schema";
import { updateProfileHandler } from "~/modules/profile/controller/updateProfile.controller";
import { updateProfileRouteSchema } from "~/modules/profile/controller/updateProfile.schema";

export const profileRoutes: FastifyPluginAsync = async (app) => {
	const profileRoutesApp = app.withTypeProvider<ZodTypeProvider>();
	const authorizeUser = app.authorize("USER");

	profileRoutesApp.route({
		method: "POST",
		url: "/",
		schema: createProfileRouteSchema,
		onRequest: authorizeUser,
		handler: createProfileHandler,
	});

	profileRoutesApp.route({
		method: "PUT",
		url: "/",
		schema: updateProfileRouteSchema,
		onRequest: authorizeUser,
		handler: updateProfileHandler,
	});

	profileRoutesApp.route({
		method: "GET",
		url: "/",
		schema: getProfileRouteSchema,
		onRequest: authorizeUser,
		handler: getProfileHandler,
	});
};

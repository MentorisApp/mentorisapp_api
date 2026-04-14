import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createProfileController } from "~/modules/profile/profile.controller";
import { createProfileRouteSchema } from "~/modules/profile/schemas/createProfile.schema";
import { getProfileRouteSchema } from "~/modules/profile/schemas/getProfile.schema";
import { updateProfileRouteSchema } from "~/modules/profile/schemas/updateProfile.schema";

export const profileRoutes: FastifyPluginAsync = async (app) => {
	const profileRoutesApp = app.withTypeProvider<ZodTypeProvider>();
	const authorizeUser = app.authorize("USER");
	const profileController = createProfileController(app);

	profileRoutesApp.route({
		method: "POST",
		url: "/",
		schema: createProfileRouteSchema,
		onRequest: authorizeUser,
		handler: profileController.createProfile,
	});

	profileRoutesApp.route({
		method: "PUT",
		url: "/",
		schema: updateProfileRouteSchema,
		onRequest: authorizeUser,
		handler: profileController.updateProfile,
	});

	profileRoutesApp.route({
		method: "GET",
		url: "/",
		schema: getProfileRouteSchema,
		onRequest: authorizeUser,
		handler: profileController.getProfile,
	});
};

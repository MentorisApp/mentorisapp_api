import { FastifyPluginAsync } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { createProfileRouteSchema } from "~/modules/profile/schemas/createProfile.schema";
import { updateProfileRouteSchema } from "~/modules/profile/schemas/updateProfile.schema";

export const profileRoutes: FastifyPluginAsync = async (app) => {
	const profileRoutesApp = app.withTypeProvider<ZodTypeProvider>();
	const authorizeUser = app.authorize("USER");

	profileRoutesApp.route({
		method: "POST",
		url: "/",
		schema: createProfileRouteSchema,
		onRequest: authorizeUser,
		handler: async function createProfile(request, reply) {
			const profileId = await app.profileService.createProfile(request.body, request.userId);
			reply.created({ id: profileId });
		},
	});

	profileRoutesApp.route({
		method: "PUT",
		url: "/",
		schema: updateProfileRouteSchema,
		onRequest: authorizeUser,
		handler: async function updateProfile(request, reply) {
			const profile = await app.profileService.updateProfile(request.body, request.userId);
			reply.ok({ data: profile });
		},
	});

	profileRoutesApp.route({
		method: "GET",
		url: "/",
		onRequest: authorizeUser,
		handler: async function getProfile(request, reply) {
			const profile = await app.profileService.getProfile(request.userId);
			reply.ok({ data: profile });
		},
	});
};

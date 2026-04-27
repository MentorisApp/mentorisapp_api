import { FastifyPluginAsync } from "fastify";

import { App } from "~/types/app.types";
import { createAuthGuards } from "~/utils/createAuthGuards.util";

import { ProfileDtoSchema } from "./schemas/dto/profile.dto";
import {
	createProfileRouteSchema,
	getProfileRouteSchema,
	updateProfileRouteSchema,
} from "./schemas/route/profile-routes.schema";

export const profileRoutes: FastifyPluginAsync = async (app: App) => {
	const { authorizeUser } = createAuthGuards(app);

	app.route({
		method: "POST",
		url: "",
		schema: createProfileRouteSchema,
		onRequest: authorizeUser,
		handler: async function createProfile(request, reply) {
			const createdProfile = await app.profileService.createProfile(request.body, request.userId);
			const data = ProfileDtoSchema.parse(createdProfile);
			reply.created({ data });
		},
	});

	app.route({
		method: "PUT",
		url: "",
		schema: updateProfileRouteSchema,
		onRequest: authorizeUser,
		handler: async function updateProfile(request, reply) {
			const updatedProfile = await app.profileService.updateProfile(request.body, request.userId);
			const data = ProfileDtoSchema.parse(updatedProfile);
			reply.ok({ data });
		},
	});

	app.route({
		method: "GET",
		url: "/me",
		onRequest: authorizeUser,
		schema: getProfileRouteSchema,
		handler: async function getUserProfile(request, reply) {
			const profile = await app.profileService.getProfile(request.userId);
			const data = ProfileDtoSchema.parse(profile);
			reply.ok({ data });
		},
	});
};

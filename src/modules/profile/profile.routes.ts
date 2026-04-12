import { FastifyInstance, RouteOptions } from "fastify";

import { profileController } from "~/modules/profile/profile.controller";

export const profileRoutes = (app: FastifyInstance) => {
	const controller = profileController();

	return {
		prefix: "/profiles",
		routes: [
			{
				method: "POST",
				url: "/",
				handler: controller.createUserProfile,
				onRequest: app.authorize("USER"),
			},
			{
				method: "PUT",
				url: "/",
				handler: controller.updateUserProfile,
				onRequest: app.authorize("USER"),
			},
			{
				method: "GET",
				url: "/",
				handler: controller.getUserProfileByUserId,
				onRequest: app.authorize("USER"),
			},
		] as RouteOptions[],
	};
};

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
				onRequest: app.authorize(),
			},
			{
				method: "PUT",
				url: "/",
				handler: controller.updateUserProfile,
				onRequest: app.authorize(),
			},
			{
				method: "GET",
				url: "/",
				handler: controller.getUserProfileByUserId,
				onRequest: app.authorize(),
			},
		] as RouteOptions[],
	};
};

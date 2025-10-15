import { FastifyInstance, RouteOptions } from "fastify";
import { profileController } from "~/controllers/profile.controller";

export const profileRoutes = (app: FastifyInstance) => {
	const controller = profileController(app);

	return {
		prefix: "/profiles",
		routes: [
			{
				method: "POST",
				url: "/",
				handler: controller.create,
				preHandler: app.authorize(),
			},
			{
				method: "PUT",
				url: "/",
				handler: controller.update,
				preHandler: app.authorize(),
			},
			{
				method: "GET",
				url: "/",
				handler: controller.get,
				preHandler: app.authorize(),
			},
		] as RouteOptions[],
	};
};

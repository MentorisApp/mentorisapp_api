import { FastifyInstance, RouteOptions } from "fastify";
import { offerController } from "~/controllers/offer.controller";

export const offerRoutes = (app: FastifyInstance) => {
	const controller = offerController(app);

	return {
		prefix: "/offers",
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
				handler: controller.getOne,
				preHandler: app.authorize(),
			},
		] as RouteOptions[],
	};
};

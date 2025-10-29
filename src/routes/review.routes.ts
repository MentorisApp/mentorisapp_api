import { FastifyInstance, RouteOptions } from "fastify";
import { reviewController } from "~/controllers/review.controller";

export const reviewRoutes = (app: FastifyInstance) => {
	const controller = reviewController(app);

	// TODO Review hide/delete/softdelete
	return {
		prefix: "/reviews",
		routes: [
			{
				method: "POST",
				url: "/",
				handler: controller.create,
				preHandler: app.authorize(),
			},
		] as RouteOptions[],
	};
};

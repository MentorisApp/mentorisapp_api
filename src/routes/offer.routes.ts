import { FastifyPluginAsync } from "fastify";
import { offerController } from "~/controllers/offer.controller";

export const offerRoutes: FastifyPluginAsync = async (app) => {
	const controller = offerController(app);

	// biome-ignore format: line wrap
	app.post(
        "/",
        { preHandler: [app.authorizeAccess()] },
        controller.create,
    );

	// biome-ignore format: line wrap
	app.put(
        "/",
        { preHandler: [app.authorizeAccess()] },
        controller.update,
    );

	// biome-ignore format: line wrap
	app.get(
        "/",
        { preHandler: [app.authorizeAccess()] },
        controller.getOne,
    );
};

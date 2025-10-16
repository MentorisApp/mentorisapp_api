import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";
import { dictionaryRoutes } from "./dictionary.routes";
import { offerRoutes } from "./offer.routes";
import { profileRoutes } from "./profile.routes";

export async function router(app: FastifyInstance) {
	const PUBLIC_MODULES = [authRoutes];
	const PRIVATE_MODULES = [profileRoutes, offerRoutes, dictionaryRoutes];

	for (const module of PUBLIC_MODULES) {
		const { prefix, routes } = module(app);

		app.register(
			async (subApp) => {
				for (const route of routes) subApp.route(route);
			},
			{ prefix },
		);
	}

	for (const module of PRIVATE_MODULES) {
		const { prefix, routes } = module(app);

		app.register(
			async (subApp) => {
				subApp.addHook("preHandler", subApp.authorize());

				for (const route of routes) {
					subApp.route(route);
				}
			},
			{ prefix },
		);
	}
}

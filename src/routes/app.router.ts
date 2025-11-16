import { FastifyInstance } from "fastify";

import { authRoutes } from "./auth.routes";
import { dictionaryRoutes } from "./dictionary.routes";
import { offerRoutes } from "./offer.routes";
import { profileRoutes } from "./profile.routes";
import { reviewRoutes } from "./review.routes";

export async function router(app: FastifyInstance) {
	const MODULES = [authRoutes, profileRoutes, offerRoutes, dictionaryRoutes, reviewRoutes];

	for (const module of MODULES) {
		const { prefix, routes } = module(app);

		app.register(
			async (subApp) => {
				for (const route of routes) subApp.route(route);
			},
			{ prefix },
		);
	}
}

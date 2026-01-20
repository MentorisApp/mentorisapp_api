import { FastifyInstance } from "fastify";

import { authRoutes } from "./auth.routes";
import { dictionaryRoutes } from "./dictionary.routes";
import { offerRoutes } from "./offer.routes";
import { profileRoutes } from "./profile.routes";
import { reviewRoutes } from "./review.routes";

const MODULES = [authRoutes, profileRoutes, offerRoutes, dictionaryRoutes, reviewRoutes];

export async function router(app: FastifyInstance) {
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

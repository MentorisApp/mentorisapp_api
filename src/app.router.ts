import { FastifyInstance } from "fastify";

import { authRoutes } from "./modules/auth/auth.routes";
import { dictionaryRoutes } from "./modules/dictionary/dictionary.routes";
import { offerRoutes } from "./modules/offer/offer.routes";
import { profileRoutes } from "./modules/profile/profile.routes";
import { reviewRoutes } from "./modules/review/review.routes";

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

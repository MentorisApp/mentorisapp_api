import { FastifyPluginAsync } from "fastify";

import { authRoutes } from "./modules/auth/auth.routes";
import { dictionaryRoutes } from "./modules/dictionary/dictionary.routes";
import { offerRoutes } from "./modules/offer/offer.routes";
import { profileRoutes } from "./modules/profile/profile.routes";
import { userRoutes } from "./modules/user/user.routes";

export const registerAppRoutes: FastifyPluginAsync = async (app) => {
	app.register(authRoutes, { prefix: "/auth" });
	app.register(userRoutes, { prefix: "/user" });
	app.register(profileRoutes, { prefix: "/profiles" });
	app.register(offerRoutes, { prefix: "/offers" });
	app.register(dictionaryRoutes, { prefix: "/dictionaries" });
};

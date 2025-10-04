import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";
import { dictionaryRoutes } from "./dictionary.routes";
import { offerRoutes } from "./offer.routes";
import { profileRoutes } from "./profile.routes";

export async function router(app: FastifyInstance) {
	// TODO validation, rate limit, load balance, throttle
	app.register(authRoutes, { prefix: "/auth" });
	app.register(profileRoutes, { prefix: "/profiles" });
	app.register(dictionaryRoutes, { prefix: "/dictionaries" });
	app.register(offerRoutes, { prefix: "/offers" });
}

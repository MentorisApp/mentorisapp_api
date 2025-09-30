import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";
import { dictionaryRoutes } from "./dictionary.routes";
import { profileRoutes } from "./profile.routes";

export async function router(app: FastifyInstance) {
	app.register(authRoutes, { prefix: "/auth" });
	app.register(profileRoutes, { prefix: "/profile" });
	app.register(dictionaryRoutes, { prefix: "/dictionary" });
}

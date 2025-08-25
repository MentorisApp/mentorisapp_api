import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";

export async function router(app: FastifyInstance) {
	app.register(authRoutes, { prefix: "/auth" });
}

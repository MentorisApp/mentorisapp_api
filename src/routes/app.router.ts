import { FastifyInstance } from "fastify";
import { userRoutes } from "./user.routes.js";

export async function appRouter(app: FastifyInstance) {
	app.register(userRoutes, { prefix: "/user" });
}

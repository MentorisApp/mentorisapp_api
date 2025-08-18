import { userRoutes } from "@routes/user.routes";
import { FastifyInstance } from "fastify";

export async function router(app: FastifyInstance) {
	app.register(userRoutes, { prefix: "/user" });
}

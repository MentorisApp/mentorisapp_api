import { userController } from "@modules/users/user.controller";
import { FastifyInstance } from "fastify";

export async function router(app: FastifyInstance) {
	app.register(userController, { prefix: "/user" });
}

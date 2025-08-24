import { FastifyInstance } from "fastify";
import { userController } from "~/modules/users/user.controller";

export async function router(app: FastifyInstance) {
	app.register(userController, { prefix: "/user" });
}

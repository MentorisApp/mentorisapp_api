import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
	app.get("/", async (request, reply) => {
		reply.send({ id: {} });
	});
}

import { FastifyInstance } from "fastify";

export async function appRouter(app: FastifyInstance) {
	// app.register(authRoutes, { prefix: "/auth" });
	app.get("/", (request, reply) => {
		reply.send({ hello: "world" });
	});
}

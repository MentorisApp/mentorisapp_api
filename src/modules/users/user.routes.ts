import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
	app.get("/", async (request, reply) => {
		const users = await app.db.select().from(app.db.users);

		return { users };
	});
}

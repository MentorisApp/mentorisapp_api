import { FastifyInstance } from "fastify";

export function createAuthGuards(app: FastifyInstance) {
	return {
		authorizeUser: app.authorize("USER"),
		authorizeAdmin: app.authorize("ADMIN"),
	};
}

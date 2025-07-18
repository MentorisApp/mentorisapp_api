import Fastify from "fastify";
import env from "./env.js";

const fastify = Fastify();

fastify.get("/", (request, reply) => {
	reply.send({ hello: "world" });
});

fastify.listen({ port: env.PORT }, (err) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}

	console.info("ENVIRONMENT =", env.NODE_ENV);
	console.info("PORT =", env.PORT);
});

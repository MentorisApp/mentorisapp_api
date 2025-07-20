import Fastify from "fastify";
import { env } from "./config/env.js";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
	request.log.error(error, "Unhandled error occurred");
	reply.code(500).send({ message: "Internal server error" });
});

app.listen({ port: env.PORT }, (err) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}

	console.info("ENVIRONMENT =", env.NODE_ENV);
	console.info("PORT =", env.PORT);
});

import { env } from "@config/env";
import { appRouter } from "@routes/appRouter";
import Fastify from "fastify";

const app = Fastify({ logger: true });

app.register(appRouter, { prefix: "/api/v1" });

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

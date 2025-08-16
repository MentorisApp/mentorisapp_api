import { env } from "@env";
import { appRouter } from "app.router";
import Fastify from "fastify";

const app = Fastify();

app.register(appRouter, { prefix: "/api/v1" });

app.setErrorHandler((_error, _request, reply) => {
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

import { env } from "@env";
import { db } from "@plugins/db";
import { router } from "app.router";
import Fastify from "fastify";

async function buildApp() {
	const app = Fastify();

	/* --------------------------- Database connection -------------------------- */
	app.register(db);

	/* ------------------------------- App router ------------------------------- */
	app.register(router, { prefix: "/api/v1" });

	/* ------------------------ Global exception handler ------------------------ */
	app.setErrorHandler((_error, _request, reply) => {
		reply.code(500).send({ message: "Internal server error" });
	});

	return app;
}

async function startAppServer() {
	const app = await buildApp();

	app.listen({ port: env.PORT }, (err) => {
		if (err) {
			app.log.error(err);
			process.exit(1);
		}

		console.info("ENVIRONMENT =", env.NODE_ENV);
		console.info("PORT =", env.PORT);
	});

	// Graceful shutdown
	const shutdown = async () => {
		console.info("Shutting down...");
		await app.close();
		process.exit(0);
	};

	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
}

startAppServer();

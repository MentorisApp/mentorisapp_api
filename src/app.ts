import { env } from "@env";
import { apiErrorWrapper } from "@plugins/apiError.plugin";
import { apiResponseWrapper } from "@plugins/apiResponse.plugin";
import { db } from "@plugins/db.plugin";
import { router } from "app.router";
import Fastify from "fastify";

async function buildApp() {
	const app = Fastify();

	app.register(db);
	app.register(apiErrorWrapper);
	app.register(apiResponseWrapper);
	app.register(router, { prefix: "/api/v1" });

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

	const shutdown = async () => {
		console.info("Shutting down...");
		await app.close();
		// TODO
		// process.exit(0);
	};

	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
}

startAppServer();

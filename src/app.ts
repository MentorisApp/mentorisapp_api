import Fastify from "fastify";
import { env } from "~/env";
import { dbClientPlugin } from "~/plugins/db.plugin";
import { globalExceptionPlugin } from "~/plugins/globalException.plugin";
import { globalResponsePlugin } from "~/plugins/globalResponse.plugin";
import { router } from "~/routes/app.router";
import { authPlugin } from "./plugins/auth.plugin";
import { cookiePlugin } from "./plugins/cookie.plugin";

const app = Fastify({
	keepAliveTimeout: 30000,
});

async function buildApp() {
	app.register(authPlugin);
	app.register(cookiePlugin);
	app.register(dbClientPlugin);
	app.register(globalResponsePlugin);
	app.register(globalExceptionPlugin);

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
		process.exit(0);
	};

	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
}

startAppServer();

import Fastify from "fastify";

import { router } from "~/app.router";
import { env } from "~/env";
import { dbClientPlugin } from "~/plugins/db.plugin";
import { globalExceptionPlugin } from "~/plugins/globalException.plugin";
import { globalResponsePlugin } from "~/plugins/globalResponse.plugin";

import { authPlugin } from "./plugins/auth.plugin";
import { cookiePlugin } from "./plugins/cookie.plugin";
import { corsPlugin } from "./plugins/cors.plugin";
import { emailPlugin } from "./plugins/email.plugin";
import { servicesPlugin } from "./plugins/services.plugin";
import { uploadFilePlugin } from "./plugins/uploadFile.plugin";

const app = Fastify({
	keepAliveTimeout: 30000,
});

async function buildApp() {
	app.register(dbClientPlugin);
	app.register(servicesPlugin);
	app.register(corsPlugin);
	app.register(authPlugin);
	app.register(cookiePlugin);
	app.register(emailPlugin);
	app.register(globalResponsePlugin);
	app.register(globalExceptionPlugin);
	app.register(uploadFilePlugin);

	// Services

	app.register(router, { prefix: "/api" });

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

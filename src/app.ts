import Fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import { registerAppRoutes } from "~/app.router";
import { env } from "~/env";
import { dbClientPlugin } from "~/plugins/db.plugin";
import { globalExceptionPlugin } from "~/plugins/globalException.plugin";

import { authPlugin } from "./plugins/auth.plugin";
import { cookiePlugin } from "./plugins/cookie.plugin";
import { corsPlugin } from "./plugins/cors.plugin";
import { emailPlugin } from "./plugins/email.plugin";
import { responsePlugin } from "./plugins/response.plugin";
import { servicesPlugin } from "./plugins/services.plugin";
import { uploadFilePlugin } from "./plugins/uploadFile.plugin";

async function buildApp() {
	const baseApp = Fastify({ keepAliveTimeout: 30000 });

	const app = baseApp.withTypeProvider<ZodTypeProvider>();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(dbClientPlugin);
	app.register(servicesPlugin);
	app.register(emailPlugin);
	app.register(corsPlugin);
	app.register(authPlugin);
	app.register(cookiePlugin);
	app.register(responsePlugin);
	app.register(globalExceptionPlugin);
	app.register(uploadFilePlugin);
	app.register(registerAppRoutes, { prefix: "/api" });

	return app;
}

async function startAppServer() {
	const app = await buildApp();

	app.listen({ port: env.PORT, host: "0.0.0.0" }, (err) => {
		if (err) {
			console.log("🚀 ~ startAppServer ~ err:", err);
			// app.log.error(err);
			process.exit(1);
		}

		console.info("ENVIRONMENT =", env.NODE_ENV);
		console.info("PORT =", env.PORT);
	});

	if (env.NODE_ENV === "production") {
		const shutdown = async () => {
			console.info("Shutting down...");
			await app.close();
			process.exit(0);
		};

		process.on("SIGINT", shutdown);
		process.on("SIGTERM", shutdown);
	}
}

startAppServer();

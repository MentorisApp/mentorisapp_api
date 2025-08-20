import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const globalExceptionHandler: FastifyPluginAsync = async (app) => {
	app.setErrorHandler((error, _request, reply) => {
		const wrapped = {
			data: null,
			messages: [error.message || "Internal server error"],
		};

		// You can also use error.statusCode if it's a FastifyError
		const status = (error as any)?.statusCode || 500;
		reply.status(status).send(wrapped);
	});
};

export const apiErrorWrapper = fp(globalExceptionHandler, {
	name: "global-exception-handler",
});

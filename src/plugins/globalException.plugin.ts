import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { v4 as uuid } from "uuid";

const globalExceptionHandler: FastifyPluginAsync = async (app) => {
	// TODO DTO object, maybe a utility for each error type?
	app.setErrorHandler((error, _request, reply) => {
		const id = uuid();
		const timestamp = new Date().toISOString();

		reply.status(error.statusCode || 500).send({
			data: null,
			messages: [
				{
					id,
					timestamp,
					user: error.message || "Internal server error",
					developer: error.message || "Internal server error",
				},
			],
		});
	});

	app.setNotFoundHandler((request, reply) => {
		// TODO identify this whole object so that onSend hook can recognize its an error payload
		const id = uuid();
		const timestamp = new Date().toISOString();

		reply.status(404).send({
			data: null,
			messages: [
				{
					id,
					timestamp,
					user: "The resource you are looking for was not found.",
					developer: `${request.method}:${request.url} not found`,
				},
			],
		});
	});
};

export const globalExceptionPlugin = fp(globalExceptionHandler, {
	name: "global-exception-plugin",
});

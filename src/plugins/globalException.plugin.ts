import { HttpStatus } from "constants/httpStatusCodes.enum";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { ErrorResponse } from "~/domain/dto/ErrorResponse.dto";
import { sendErrorResponse } from "~/utils/response.util";

const globalExceptionHandler: FastifyPluginAsync = async (app) => {
	// Global error handler
	app.setErrorHandler((error, _request, reply) => {
		console.error(error);
		sendErrorResponse(error, reply);
	});

	// 404 route handler
	app.setNotFoundHandler((request, reply) => {
		console.log(request);
		reply.status(HttpStatus.NOT_FOUND).send(
			new ErrorResponse({
				status: HttpStatus.NOT_FOUND,
				message: "Route not found",
				detail: `${request.method}:${request.url} not found`,
			}),
		);
	});
};

export const globalExceptionPlugin = fp(globalExceptionHandler, {
	name: "global-exception-plugin",
});

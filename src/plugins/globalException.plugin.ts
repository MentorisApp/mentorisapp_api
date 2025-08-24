// import { createApiResponse } from "~/utils/response.util";
import { HttpStatus } from "constants/httpStatusCodes.enum";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { ErrorResponse } from "~/domain/dto/ErrorResponse.dto";
import { sendErrorResponse } from "~/utils/response.util";

const globalExceptionHandler: FastifyPluginAsync = async (app) => {
	app.setErrorHandler((error, _request, reply) => {
		sendErrorResponse(error, reply);
	});

	app.setNotFoundHandler((request, reply) => {
		const response = new ErrorResponse({
			status: HttpStatus.NOT_FOUND,
			message: "Route not found",
			detail: `${request.method}:${request.url} not found`,
		});

		reply.status(HttpStatus.NOT_FOUND).send(response);
	});
};

export const globalExceptionPlugin = fp(globalExceptionHandler, {
	name: "global-exception-plugin",
});

import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { handleAppError } from "~/errors/handlers/handleAppError";
import { handleAuthError } from "~/errors/handlers/handleAuthError";
import { handleDbError } from "~/errors/handlers/handleDatabaseError";
import { handleUnknownError } from "~/errors/handlers/handleUnknownError";
import { handleValidationError } from "~/errors/handlers/handleValidationError";
import { buildErrorResponse } from "~/utils/errorResponse.util";

const globalExceptionHandler: FastifyPluginAsync = async (app) => {
	app.setErrorHandler((error, _req, reply) => {
		console.log("🚀 ~ globalExceptionHandler ~ error:", error);
		const handlers = [
			handleAppError,
			handleValidationError,
			handleDbError,
			handleAuthError,
			handleUnknownError, // MUST BE LAST IN ARRAY
		];

		for (const handler of handlers) {
			const handled = handler(error, reply);
			if (handled) break;
		}
	});

	app.setNotFoundHandler((_request, reply) => {
		return reply.status(HttpStatus.NOT_FOUND).send(
			buildErrorResponse({
				message: "Route not found",
				code: ApiCode.NOT_FOUND,
			}),
		);
	});
};

export const globalExceptionPlugin = fp(globalExceptionHandler, {
	name: "global-exception-plugin",
});

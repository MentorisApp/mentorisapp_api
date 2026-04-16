import { DrizzleQueryError } from "drizzle-orm/errors";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { DatabaseError } from "pg";
import { ZodError } from "zod";

import { ApiCode } from "~/constants/apiCode.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { AppError } from "~/errors/base/AppError";
import { handleDatabaseError } from "~/utils/db.util";
import { buildErrorResponse } from "~/utils/errorResponse.util";

const globalExceptionHandler: FastifyPluginAsync = async (app) => {
	app.setErrorHandler((error, _request, reply) => {
		// -------------------------------------------------------
		// 1. APP ERROR (your domain/system errors)
		// -------------------------------------------------------
		if (error instanceof AppError) {
			const response = buildErrorResponse(error);

			return reply.status(error.statusCode).send(response);
		}

		// -------------------------------------------------------
		// 2. VALIDATION ERROR (Zod)
		// -------------------------------------------------------
		if (error instanceof ZodError) {
			const response = buildErrorResponse({
				message: "Validation error",
				code: ApiCode.VALIDATION_ERROR,

				// detail: z.flattenError(error),
			});

			return reply.status(HttpStatus.BAD_REQUEST).send(response);
		}

		// -------------------------------------------------------
		// 3. DATABASE ERROR (Drizzle + Postgres)
		// -------------------------------------------------------
		if (error instanceof DrizzleQueryError) {
			const pgError = error.cause;

			if (pgError instanceof DatabaseError) {
				const dbError = handleDatabaseError(pgError);

				const response = buildErrorResponse({
					message: dbError.message,
					code: dbError.code,
				});

				return reply.status(dbError.statusCode).send(response);
			}
		}

		// -------------------------------------------------------
		// 4. FASTIFY / JWT ERRORS
		// -------------------------------------------------------
		if (
			(error as any).code === "FST_JWT_NO_AUTHORIZATION_IN_HEADER" ||
			(error as any).code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED" ||
			(error as any).code === "FST_JWT_NO_AUTHORIZATION_IN_COOKIE"
		) {
			const response = buildErrorResponse({
				message: "Unauthorized",
				code: ApiCode.UNAUTHORIZED,
			});

			return reply.status(HttpStatus.UNAUTHORIZED).send(response);
		}

		// -------------------------------------------------------
		// 5. UNKNOWN ERROR (fallback)
		// -------------------------------------------------------
		const response = buildErrorResponse({
			message: "Internal Server Error",
			code: ApiCode.INTERNAL_SERVER_ERROR,
		});

		return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(response);
	});

	// -------------------------------------------------------
	// 404 handler
	// -------------------------------------------------------
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

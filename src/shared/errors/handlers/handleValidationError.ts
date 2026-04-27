import { FastifyError, FastifyReply } from "fastify";
import { ZodFastifySchemaValidationError } from "fastify-type-provider-zod";

import { ApiErrorCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { buildErrorResponse } from "~/utils/errorResponse.util";

import { mapValidationErrors } from "./mapValidationError";

export function handleValidationError(error: FastifyError, reply: FastifyReply) {
	if (!(error.code === "FST_ERR_VALIDATION")) return false;

	const mappedFieldErrors = mapValidationErrors(
		error.validation as ZodFastifySchemaValidationError[],
	);

	const response = buildErrorResponse({
		message: error.validation?.[0]?.message ?? "Validation error",
		code: ApiErrorCode.VALIDATION_ERROR,
		fieldErrors: mappedFieldErrors,
	});

	reply.status(HttpStatus.BAD_REQUEST).send(response);

	return true;
}

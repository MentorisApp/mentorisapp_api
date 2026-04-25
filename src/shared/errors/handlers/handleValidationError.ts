import { FastifyError, FastifyReply } from "fastify";

import { ApiCode } from "~/enums/apiCode.enum";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { buildErrorResponse } from "~/utils/errorResponse.util";

export function handleValidationError(error: FastifyError, reply: FastifyReply) {
	if (!(error.code === "FST_ERR_VALIDATION")) return false;

	// TODO errors
	const response = buildErrorResponse({
		message: error.validation?.[0]?.message ?? "Validation error",
		code: ApiCode.VALIDATION_ERROR,
		// TODO TRY TO MAP ROUTE SCHEMA VALIDATION ZOD ERROR INTO A NICE ERROR FOR RESPONSE DTO
		// fieldErrors: error.validation,
	});

	reply.status(HttpStatus.BAD_REQUEST).send(response);

	return true;
}

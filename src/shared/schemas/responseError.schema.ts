import { z } from "zod";

import { ApiErrorCode } from "~/enums/apiCode.enum";

export const FieldErrorsSchema = z.record(z.string(), z.array(z.string())).nullable();

export const ErrorResponseSchema = z.object({
	code: z.enum(ApiErrorCode),
	message: z.string().nullable(),
	fieldErrors: FieldErrorsSchema,
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

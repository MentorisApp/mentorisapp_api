import { z } from "zod";

export const FieldErrorsSchema = z.record(z.string(), z.array(z.string())).nullable().optional();

export const ErrorResponseSchema = z.object({
	code: z.string(),
	message: z.string().nullable(),
	fieldErrors: FieldErrorsSchema,
});

import z from "zod";

export const successResponseSchema = <TDataSchema extends z.ZodTypeAny>(dataSchema: TDataSchema) =>
	z.object({
		success: z.literal(true),
		data: dataSchema,
	});

export const emptySuccessResponseSchema = successResponseSchema(z.null());

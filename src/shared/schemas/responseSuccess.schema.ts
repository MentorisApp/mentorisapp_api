import { z } from "zod";

// 200,201 GET, POST, PUT
export const ApiResponseSchema = <TData extends z.ZodTypeAny>(dataSchema: TData) =>
	z.object({
		data: dataSchema,
	});

// 200 GET
export const ApiResponseWithMetaSchema = <TData extends z.ZodTypeAny, TMeta extends z.ZodTypeAny>(
	dataSchema: TData,
	metaSchema: TMeta,
) =>
	z.object({
		data: dataSchema,
		meta: metaSchema,
	});

// 204 DELETE
export const ApiResponseNoContentSchema = z.undefined();

import { z } from "zod";

import { ErrorCodes } from "~/enums/apiCode.enum";

export const PaginationMetaSchema = z.object({
	page: z.number(),
	pageSize: z.number(),
	total: z.number(),
	totalPages: z.number(),
});

export const SearchMetaSchema = z.object({
	query: z.string(),
	resultCount: z.number(),
});

export const ApiResponse = <TData extends z.ZodTypeAny, TMeta extends z.ZodTypeAny = z.ZodNull>(
	dataSchema: TData,
	metaSchema?: TMeta,
) =>
	z.object({
		data: dataSchema,
		meta: (metaSchema ?? z.null()) as TMeta,
	});

export const ApiResponseNoContent = z.undefined();

export const ErrorResponseSchema = z.object({
	code: z.enum(ErrorCodes),
	message: z.string().nullable(),
	fieldErrors: z.record(z.string(), z.array(z.string())).nullable().optional(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export type SearchMeta = z.infer<typeof SearchMetaSchema>;

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type SuccessResponse<TData, TMeta = unknown> = {
	data?: TData;
	meta?: TMeta;
};

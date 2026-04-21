import { z } from "zod";

// TODO filter meta schema
// TODO mayb request meta schema with timestamps etc
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

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export type SearchMeta = z.infer<typeof SearchMetaSchema>;

export type SuccessResponse<TData, TMeta = unknown> = {
	data?: TData;
	meta?: TMeta;
};

export type ErrorResponse = {
	// TODO make type safe code
	code: string; // domain or generic code
	message: string | null; // human readable fallback
	fieldErrors?: Record<string, string[]> | null; // form mappings
};

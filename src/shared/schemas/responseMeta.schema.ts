import { z } from "zod";

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

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export type SearchMeta = z.infer<typeof SearchMetaSchema>;

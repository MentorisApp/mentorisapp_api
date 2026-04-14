import { createSelectSchema } from "drizzle-zod";
import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { categories } from "~/db/schema";
import { successResponseSchema } from "~/utils/http-schema.util";

export const GetCategoriesResponseSchema = z.array(createSelectSchema(categories));

export type GetCategoriesResponse = z.infer<typeof GetCategoriesResponseSchema>;

export const getCategoriesRouteSchema = {
	response: {
		[HttpStatus.OK]: successResponseSchema(GetCategoriesResponseSchema),
	},
};

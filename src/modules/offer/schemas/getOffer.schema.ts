import { createSelectSchema } from "drizzle-zod";
import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { categories, offers } from "~/db/schema";
import { successResponseSchema } from "~/utils/http-schema.util";

const CategorySchema = createSelectSchema(categories);

export const GetOfferResponseSchema = createSelectSchema(offers)
	.extend({
		categories: z.array(CategorySchema),
	})
	.strict();

export type GetOfferResponse = z.infer<typeof GetOfferResponseSchema>;

export const getOfferRouteSchema = {
	response: {
		[HttpStatus.OK]: successResponseSchema(GetOfferResponseSchema),
	},
};

import { createSelectSchema } from "drizzle-zod";
import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { categories, offers } from "~/db/schema";
import { successResponseSchema } from "~/utils/http-schema.util";
import { createPositiveIntParamsSchema } from "~/utils/zod-shared.validator";

const CategorySchema = createSelectSchema(categories);

export const GetOfferByIdParamsSchema = createPositiveIntParamsSchema("offerId");

export type GetOfferByIdParams = z.infer<typeof GetOfferByIdParamsSchema>;

export const GetOfferByIdResponseSchema = createSelectSchema(offers)
	.extend({
		categories: z.array(CategorySchema),
	})
	.strict();

export type GetOfferByIdResponse = z.infer<typeof GetOfferByIdResponseSchema>;

export const getOfferByIdRouteSchema = {
	params: GetOfferByIdParamsSchema,
	response: {
		[HttpStatus.OK]: successResponseSchema(GetOfferByIdResponseSchema),
	},
};

const test = createSelectSchema(offers);

type Test = z.infer<typeof test>;

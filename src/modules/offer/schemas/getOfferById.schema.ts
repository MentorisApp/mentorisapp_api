import z from "zod";

import { createPositiveIntParamsSchema } from "~/shared/schemas/general.schema";

export const GetOfferByIdParamsSchema = createPositiveIntParamsSchema("offerId");

export type GetOfferByIdParams = z.infer<typeof GetOfferByIdParamsSchema>;

export const getOfferByIdRouteSchema = {
	params: GetOfferByIdParamsSchema,
};

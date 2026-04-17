import z from "zod";

import { createPositiveIntParamsSchema } from "~/utils/zod-shared.validator";

export const GetOfferByIdParamsSchema = createPositiveIntParamsSchema("offerId");

export type GetOfferByIdParams = z.infer<typeof GetOfferByIdParamsSchema>;

export const getOfferByIdRouteSchema = {
	params: GetOfferByIdParamsSchema,
};

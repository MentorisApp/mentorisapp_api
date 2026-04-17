import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { createPositiveIntParamsSchema } from "~/utils/zod-shared.validator";

export const GetOfferReviewsParamsSchema = createPositiveIntParamsSchema("offerId");

const OfferReviewSchema = z
	.object({
		id: z.number().int().positive(),
		rating: z.number(),
		description: z.string().nullable(),
		offerId: z.number().int().positive(),
		createdAt: z.date(),
		user: z
			.object({
				profilePictureUrl: z.string().nullable(),
			})
			.strict(),
	})
	.strict();

export const GetOfferReviewsResponseSchema = z.array(OfferReviewSchema);

export const getOfferReviewsRouteSchema = {
	params: GetOfferReviewsParamsSchema,
};

export type GetOfferReviewsParams = z.infer<typeof GetOfferReviewsParamsSchema>;
export type GetOfferReviewsResponse = z.infer<typeof GetOfferReviewsResponseSchema>;

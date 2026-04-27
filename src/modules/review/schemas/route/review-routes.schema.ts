import { SwaggerTags } from "~/constants/swaggerTags";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { offerIdParamsSchema } from "~/modules/offer/schemas/params/offer.params.schema";
import { ApiResponseSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

import { CreateReviewRequestSchema } from "../dto/create-review.schema";
import { ReviewDtoSchema } from "../dto/review.dto";

const TAG = SwaggerTags.OFFER;

export const createReviewRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Creates a review for an offer",
	body: CreateReviewRequestSchema,
	response: {
		[HttpStatus.CREATED]: ApiResponseSchema(ReviewDtoSchema),
	},
});

export const getOfferReviewsRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Fetches all reviews for an offer",
	params: offerIdParamsSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(ReviewDtoSchema.array()),
	},
});

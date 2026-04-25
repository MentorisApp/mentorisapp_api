import { SwaggerTags } from "~/constants/swaggerTags";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { offerIdParamsSchema } from "~/modules/offer/schemas/params/offer.params.schema";
import { ApiResponseSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

import { CreateOfferRequestSchema } from "../dto/create-offer.schema";
import { OfferDtoSchema } from "../dto/offer.dto";
import { UpdateOfferRequestSchema } from "../dto/update-offer.schema";

export const createOfferRouteSchema = createRouteSchema({
	tags: [SwaggerTags.OFFER],
	summary: "Creates offer",
	body: CreateOfferRequestSchema,
	response: {
		[HttpStatus.CREATED]: ApiResponseSchema(OfferDtoSchema),
	},
});

export const updateOfferRouteSchema = createRouteSchema({
	tags: [SwaggerTags.OFFER],
	summary: "Updates offer",
	body: UpdateOfferRequestSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(OfferDtoSchema),
	},
});

export const getMyOfferRouteSchema = createRouteSchema({
	tags: [SwaggerTags.OFFER],
	summary: "Fetch user offer",
	response: {
		[HttpStatus.OK]: ApiResponseSchema(OfferDtoSchema),
	},
});

export const getOfferByOfferIdRouteSchema = createRouteSchema({
	tags: [SwaggerTags.OFFER],
	summary: "Fetches offer by offer id",
	params: offerIdParamsSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(OfferDtoSchema),
	},
});

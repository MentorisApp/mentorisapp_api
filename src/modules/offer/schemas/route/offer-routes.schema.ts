import { SwaggerTags } from "~/constants/swaggerTags";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { offerIdParamsSchema } from "~/modules/offer/schemas/params/offer.params.schema";
import { ApiResponseSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

import { CreateOfferRequestSchema } from "../dto/create-offer.schema";
import { OfferDtoSchema } from "../dto/offer.dto";
import { UpdateOfferRequestSchema } from "../dto/update-offer.schema";

const TAG = SwaggerTags.OFFER;

export const createOfferRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Creates offer",
	body: CreateOfferRequestSchema,
	response: {
		[HttpStatus.CREATED]: ApiResponseSchema(OfferDtoSchema),
	},
});

export const updateOfferRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Updates offer",
	body: UpdateOfferRequestSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(OfferDtoSchema),
	},
});

export const getMyOfferRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Fetch user offer",
	response: {
		[HttpStatus.OK]: ApiResponseSchema(OfferDtoSchema),
	},
});

export const getOfferByOfferIdRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Fetches offer by offer id",
	params: offerIdParamsSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(OfferDtoSchema),
	},
});

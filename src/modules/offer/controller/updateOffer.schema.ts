import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { offers } from "~/db/schema";
import { successResponseSchema } from "~/utils/http-schema.util";

export const UpdateOfferRequestSchema = createUpdateSchema(offers)
	.pick({
		title: true,
		description: true,
		level: true,
		format: true,
		price: true,
		priceFrom: true,
		priceTo: true,
		priceType: true,
		updatedAt: true,
	})
	.extend({
		categoryIds: z.array(z.number()).min(1, "At least one category must be selected").optional(),
	})
	.refine((payload) => !(payload.price && (payload.priceFrom || payload.priceTo)), {
		message: "Cannot set fixed price and range together",
		path: ["price", "priceFrom", "priceTo"],
	})
	.refine((payload) => payload.priceType !== "FIXED" || payload.price, {
		message: "Price must be defined if price type is set as: FIXED",
		path: ["price"],
	})
	.refine((payload) => payload.priceType !== "RANGE" || (payload.priceFrom && payload.priceTo), {
		message: "Price from/to must be defined if price type is set as: RANGE",
		path: ["priceFrom", "priceTo"],
	})
	.strict();

export type UpdateOfferRequest = z.infer<typeof UpdateOfferRequestSchema>;

export const UpdateOfferResponseSchema = createSelectSchema(offers);

export type UpdateOfferResponse = z.infer<typeof UpdateOfferResponseSchema>;

export const updateOfferRouteSchema = {
	body: UpdateOfferRequestSchema,
	response: {
		[HttpStatus.OK]: successResponseSchema(UpdateOfferResponseSchema),
	},
};

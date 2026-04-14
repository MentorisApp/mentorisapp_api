import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { offers } from "~/db/schema";
import { successResponseSchema } from "~/utils/http-schema.util";

export const CreateOfferRequestSchema = createInsertSchema(offers)
	.pick({
		title: true,
		description: true,
		level: true,
		format: true,
		price: true,
		priceFrom: true,
		priceTo: true,
		priceType: true,
	})
	.extend({
		categoryIds: z.array(z.number()).min(1, "At least one category must be selected"),
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

export type CreateOfferRequest = z.infer<typeof CreateOfferRequestSchema>;

export const CreateOfferResponseSchema = createSelectSchema(offers);

export type CreateOfferResponse = z.infer<typeof CreateOfferResponseSchema>;

export const createOfferRouteSchema = {
	body: CreateOfferRequestSchema,
	response: {
		[HttpStatus.CREATED]: successResponseSchema(CreateOfferResponseSchema),
	},
};

import z from "zod";

export const CreateOfferRequestSchema = z
	.object({
		title: z.string(),
		description: z.string(),
		level: z.string(), // adjust enum if you have one
		format: z.string(), // adjust enum if needed

		priceType: z.enum(["FIXED", "RANGE"]),

		price: z.number().positive().nullable().optional(),
		priceFrom: z.number().positive().nullable().optional(),
		priceTo: z.number().positive().nullable().optional(),

		categoryIds: z.array(z.number()).min(1, "At least one category must be selected"),
	})
	.refine((payload) => !(payload.price && (payload.priceFrom || payload.priceTo)), {
		message: "Cannot set fixed price and range together",
		path: ["price"],
	})
	.refine((payload) => payload.priceType !== "FIXED" || payload.price != null, {
		message: "Price must be defined if price type is set as: FIXED",
		path: ["price"],
	})
	.refine(
		(payload) =>
			payload.priceType !== "RANGE" || (payload.priceFrom != null && payload.priceTo != null),
		{
			message: "Price from/to must be defined if price type is set as: RANGE",
			path: ["priceFrom"],
		},
	)
	.strict();

export type CreateOfferRequest = z.infer<typeof CreateOfferRequestSchema>;

import z from "zod";

export const OfferDtoSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	priceType: z.string(),
	price: z.number().nullable(),
	priceFrom: z.number().nullable(),
	priceTo: z.number().nullable(),
	level: z.string(),
	format: z.object({
		id: z.number(),
		title: z.string(),
	}),
});

export type OfferDto = z.infer<typeof OfferDtoSchema>;

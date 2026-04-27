import z from "zod";

import { DictionaryDtoSchema } from "~/modules/dictionary/schemas/dto/dictionary.dto";

export const OfferDtoSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),

	priceFromCents: z.number().int().nonnegative(),
	priceToCents: z.number().int().nonnegative(),

	levels: z.array(DictionaryDtoSchema),
	formats: z.array(DictionaryDtoSchema),
	categories: z.array(DictionaryDtoSchema),
});

export type OfferDto = z.infer<typeof OfferDtoSchema>;

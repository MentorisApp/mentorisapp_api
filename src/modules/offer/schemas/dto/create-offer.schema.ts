import { z } from "zod";

export const CreateOfferRequestSchema = z
	.object({
		title: z.string().min(1),
		description: z.string().min(10),

		priceFromCents: z.number().int().nonnegative(),
		priceToCents: z.number().int().nonnegative(),

		formatIdList: z.array(z.number()).min(1, "At least one level must be selected"),
		levelIdList: z.array(z.number()).min(1, "At least one level must be selected"),
		categoryIdList: z.array(z.number()).min(1, "At least one category must be selected"),
	})
	.strict()
	.refine((data) => data.priceFromCents <= data.priceToCents, {
		message: "Price range is invalid",
		path: ["priceToCents"],
	});

export type CreateOfferRequest = z.infer<typeof CreateOfferRequestSchema>;

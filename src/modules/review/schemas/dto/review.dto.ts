import z from "zod";

export const ReviewDtoSchema = z.object({
	id: z.number().int().positive(),
	rating: z.number(),
	description: z.string().nullable(),
	offerId: z.number().int().positive(),
	createdAt: z.date(),
	user: z.object({
		profilePictureUrl: z.string().nullable(),
		name: z.string(),
	}),
});

export type ReviewDto = z.infer<typeof ReviewDtoSchema>;

import z from "zod";

export const CreateReviewRequestSchema = z
	.object({
		description: z.string().optional(),
		rating: z.number(),
		offerId: z.number(),
	})
	.strict();

export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;

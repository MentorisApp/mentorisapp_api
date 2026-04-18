import { createInsertSchema } from "drizzle-zod";
import z from "zod";

import { reviews } from "~/db/schema";

export const CreateReviewRequestSchema = createInsertSchema(reviews)
	.pick({
		description: true,
		rating: true,
		offerId: true,
	})
	.strict();

export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;

export const createReviewRouteSchema = {
	body: CreateReviewRequestSchema,
};

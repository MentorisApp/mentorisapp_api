import { createInsertSchema } from "drizzle-zod";
import { FastifySchema } from "fastify";
import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { reviews } from "~/db/schema";
import { successResponseSchema } from "~/utils/http-schema.util";

export const CreateReviewRequestSchema = createInsertSchema(reviews)
	.pick({
		description: true,
		rating: true,
		offerId: true,
	})
	.strict();

export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;

export const CreateReviewResponseSchema = z
	.object({
		id: z.number().int().positive(),
	})
	.strict();

export type CreateReviewResponse = z.infer<typeof CreateReviewResponseSchema>;

export const createReviewRouteSchema = {
	body: CreateReviewRequestSchema,
	response: {
		[HttpStatus.CREATED]: successResponseSchema(CreateReviewResponseSchema),
	},
} satisfies FastifySchema;

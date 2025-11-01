import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

import { reviews } from "~/db/schema";

export const ReviewCreateSchema = createInsertSchema(reviews)
	// TODO Sanitize user created fields
	.pick({ description: true, rating: true, offerId: true })
	.strict();

export const ReviewUpdateSchema = createUpdateSchema(reviews)
	.pick({ id: true, description: true, rating: true })
	.required({ rating: true, id: true })
	.strict();

export type ReviewCreate = z.infer<typeof ReviewCreateSchema>;
export type ReviewUpdate = z.infer<typeof ReviewUpdateSchema>;

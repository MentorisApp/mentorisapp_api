import { createInsertSchema } from "drizzle-zod";
import z from "zod";

import { profiles } from "~/db/schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

export const CreateProfileRequestSchema = createInsertSchema(profiles)
	.omit({
		id: true,
		profilePictureUrl: true,
		createdAt: true,
		userId: true,
		updatedAt: true,
		modAt: true,
		modBy: true,
		modReason: true,
		modStatus: true,
	})
	.extend({
		profilePicture: z.url().optional(),
	})
	.strict();

export type CreateProfileRequest = z.infer<typeof CreateProfileRequestSchema>;


// TODO mapiraj sa novim tipovima i isprobaj jel radi

export const createProfileRouteSchema = {
	body: CreateProfileRequestSchema,
};


export const createProfileRouteSchema = createRouteSchema({
	tags: ['Profile']
	body:CreateProfileRequestSchema,
	response: 
})
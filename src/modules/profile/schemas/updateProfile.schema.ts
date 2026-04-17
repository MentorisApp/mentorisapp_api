import { createUpdateSchema } from "drizzle-zod";
import z from "zod";

import { profiles } from "~/db/schema";

export const UpdateProfileRequestSchema = createUpdateSchema(profiles)
	.omit({
		profilePictureUrl: true,
		createdAt: true,
		updatedAt: true,
		id: true,
		modAt: true,
		userId: true,
		modBy: true,
		modReason: true,
		modStatus: true,
	})
	.extend({
		profilePicture: z.url().optional(),
		dob: z.string().optional(),
		cityId: z.coerce.number().optional(),
		name: z.string().optional(),
		bio: z.string().optional(),
	})
	.strict();

export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;

export const updateProfileRouteSchema = {
	body: UpdateProfileRequestSchema,
};

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { profiles } from "~/db/schema";
import { successResponseSchema } from "~/utils/http-schema.util";

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

export const CreateProfileResponseSchema = createSelectSchema(profiles);

export type CreateProfileResponse = z.infer<typeof CreateProfileResponseSchema>;

export const createProfileRouteSchema = {
	body: CreateProfileRequestSchema,
	response: {
		[HttpStatus.CREATED]: successResponseSchema(CreateProfileResponseSchema),
	},
};

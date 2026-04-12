import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

import { profiles } from "~/db/schema";

export const ProfileCreateSchema = createInsertSchema(profiles)
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

export const ProfileUpdateSchema = createUpdateSchema(profiles)
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

export type ProfileCreate = z.infer<typeof ProfileCreateSchema>;
export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>;

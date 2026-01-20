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
		age: z.coerce.number(),
		educationLevelId: z.coerce.number(),
		cityId: z.coerce.number(),
		genderId: z.coerce.number(),
		countryId: z.coerce.number(),
	})
	.strict();

export const ProfileUpdateSchema = createUpdateSchema(profiles)
	.omit({
		profilePictureUrl: true,
		createdAt: true,
		updatedAt: true,
		id: true,
		modAt: true,
		modBy: true,
		modReason: true,
		modStatus: true,
	})
	.extend({
		profilePicture: z.url().optional(),
		age: z.coerce.number().optional(),
		educationLevelId: z.coerce.number().optional(),
		cityId: z.coerce.number().optional(),
		genderId: z.coerce.number().optional(),
		countryId: z.coerce.number().optional(),
	})
	.strict();

export type ProfileCreate = z.infer<typeof ProfileCreateSchema>;
export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>;

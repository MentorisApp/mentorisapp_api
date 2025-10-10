import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";
import { profiles } from "~/db/schema";

export const ProfileCreateSchema = createInsertSchema(profiles)
	// TODO profilePictureUrl creation flow
	.omit({ id: true, createdAt: true, profilePictureUrl: true, userId: true })
	.strict();

export const ProfileUpdateSchema = createUpdateSchema(profiles)
	.omit({ profilePictureUrl: true, createdAt: true })
	.required({
		id: true,
	})
	.strict();

export type ProfileCreate = z.infer<typeof ProfileCreateSchema>;
export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>;

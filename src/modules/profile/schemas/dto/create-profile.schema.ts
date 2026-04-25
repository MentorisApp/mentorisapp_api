import { z } from "zod";

export const CreateProfileRequestSchema = z
	.object({
		name: z.string().min(1),
		bio: z.string().optional(),
		dob: z.coerce.date().optional(),
		profilePicture: z.url().optional(),
	})
	.strict();

export type CreateProfileRequest = z.infer<typeof CreateProfileRequestSchema>;

import z from "zod";

export const UserDtoSchema = z.object({
	id: z.number(),
	email: z.string(),
	name: z.string(),
	profilePictureUrl: z.string().nullable(),
	isVerified: z.boolean(),
	// TODO maybe role, useful for FE?
});

export type UserDto = z.infer<typeof UserDtoSchema>;

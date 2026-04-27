import z from "zod";

export const ProfileDtoSchema = z.object({
	name: z.string().min(2),
	bio: z.string().nullable(),
	dob: z.iso.date().nullable(),
	profilePictureUrl: z.url().nullable(),
});

export type ProfileDto = z.infer<typeof ProfileDtoSchema>;

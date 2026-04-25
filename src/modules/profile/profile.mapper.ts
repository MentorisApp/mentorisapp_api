import { profiles } from "~/db/schema";

import { ProfileDto } from "./schemas/dto/profile.dto";

type Profile = typeof profiles.$inferSelect;

export const profileMapper = {
	toDto(profile: Profile): ProfileDto {
		return {
			bio: profile.bio,
			dob: profile.dob,
			name: profile.name,
			profilePictureUrl: profile.profilePictureUrl,
		};
	},
};

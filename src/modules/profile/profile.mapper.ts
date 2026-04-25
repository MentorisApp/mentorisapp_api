import { profiles } from "~/db/schema";

import { ProfileDto } from "./profile.schema";

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

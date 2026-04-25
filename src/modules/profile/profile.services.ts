import { eq } from "drizzle-orm";

import { ConflictError } from "~/shared/errors/generic/ConflictError";
import { NotFoundError } from "~/shared/errors/generic/NotFoundError";
import { App } from "~/types/app.types";
import { unwrapResult } from "~/utils/db.util";

import { CreateProfileRequest } from "./schemas/dto/create-profile.schema";
import { UpdateProfileRequest } from "./schemas/dto/update-profile.schema";

export function createProfileService(app: App) {
	const { db } = app;
	const { profiles } = db;

	// TODO sanitize multipart fields, trim and clear up
	async function createProfile(body: CreateProfileRequest, userId: number) {
		const existingProfile = await checkExistsProfileByUserId(userId);

		if (existingProfile) throw new ConflictError("Profile already exists");

		const [profile] = await db
			.insert(profiles)
			.values({ userId: userId, ...body, dob: undefined })
			.returning();

		return profile;
	}

	async function checkExistsProfileByUserId(userId: number) {
		const result = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
		return result.length > 0;
	}

	async function updateProfile(body: UpdateProfileRequest, userId: number) {
		const existingProfile = await checkExistsProfileByUserId(userId);

		if (!existingProfile) {
			throw new NotFoundError("Profile you are trying to update does not exist");
		}

		const updatedProfile = await db
			.update(profiles)
			.set({
				...body,
				profilePictureUrl: body.profilePicture,
				dob: body.dob?.toISOString(),
			})
			.where(eq(profiles.userId, userId))
			.returning();

		return unwrapResult(updatedProfile);
	}

	async function getProfile(userId: number) {
		const profile = await db.query.profiles.findFirst({
			where: eq(profiles.userId, userId),
		});

		if (!profile) throw new NotFoundError("Profile not found.");

		return profile;
	}

	return {
		getProfile,
		createProfile,
		updateProfile,
		checkExistsProfileByUserId,
	};
}

export type ProfileService = ReturnType<typeof createProfileService>;

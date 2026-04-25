import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";

import { ConflictError } from "~/shared/errors/generic/ConflictError";
import { NotFoundError } from "~/shared/errors/generic/NotFoundError";
import { unwrapResult } from "~/utils/db.util";

import { CreateProfileRequest, UpdateProfileRequest } from "./profile.schema";

export function createProfileService(app: FastifyInstance) {
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

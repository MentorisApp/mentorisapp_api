import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";

import { AlreadyExistsError } from "~/domain/errors/AlreadyExistsError";
import { NotFoundError } from "~/domain/errors/NotFoundError";
import { unwrapResult } from "~/utils/db.util";
import { ProfileCreate, ProfileUpdate } from "~/validators/profile.validator";

export function createProfileService(app: FastifyInstance) {
	const { db } = app;
	const { profiles } = db;

	// TODO sanitize multipart fields, trim and clear up
	async function createProfile(body: ProfileCreate, userId: number) {
		const existingProfile = await checkExistsProfileByUserId(userId);

		if (existingProfile) {
			throw new AlreadyExistsError("Profile already exists");
		}

		const result = await db
			.insert(profiles)
			.values({
				...body,
				profilePictureUrl: body.profilePicture,
				userId: userId,
			})
			.returning();

		const newProfile = unwrapResult(result);

		return newProfile;
	}

	async function checkExistsProfileByUserId(userId: number) {
		const result = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
		return result.length > 0;
	}

	async function updateProfile(body: ProfileUpdate, userId: number) {
		const existingProfile = await checkExistsProfileByUserId(userId);

		if (!existingProfile) {
			throw new NotFoundError("Profile you are trying to update does not exist");
		}

		const record = await db
			.update(profiles)
			.set({
				...body,
				profilePictureUrl: body.profilePicture,
				updatedAt: new Date(),
			})
			.where(eq(profiles.userId, userId))
			.returning();

		return unwrapResult(record);
	}

	async function getProfile(userId: number) {
		const profile = await db.query.profiles.findFirst({
			where: eq(profiles.userId, userId),
			columns: {
				age: true,
				profilePictureUrl: true,
				firstName: true,
				lastName: true,
				id: true,
				phone: true,
				userId: true,
				homeAddress: true,
			},
			with: { city: true, country: true, educationLevel: true, gender: true },
		});

		if (!profile) {
			throw new NotFoundError("Profile not found.");
		}

		return profile;
	}

	return {
		getProfile,
		createProfile,
		updateProfile,
		checkExistsProfileByUserId,
	};
}

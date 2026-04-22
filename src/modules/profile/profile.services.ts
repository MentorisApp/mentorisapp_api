import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";

import { ConflictError } from "~/errors/generic/ConflictError";
import { NotFoundError } from "~/errors/generic/NotFoundError";
import { unwrapResult } from "~/utils/db.util";

import type { CreateProfileRequest } from "./schemas/createProfile.schema";
import type { UpdateProfileRequest } from "./schemas/updateProfile.schema";

export function createProfileService(app: FastifyInstance) {
	const { db } = app;
	const { profiles } = db;

	// TODO sanitize multipart fields, trim and clear up
	async function createProfile(body: CreateProfileRequest, userId: number) {
		const existingProfile = await checkExistsProfileByUserId(userId);

		if (existingProfile) throw new ConflictError("Profile already exists");

		const profile = await db
			.insert(profiles)
			.values({
				...body,
				profilePictureUrl: body.profilePicture,
				userId: userId,
			})
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
				id: true,
				userId: true,
				profilePictureUrl: true,
			},
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

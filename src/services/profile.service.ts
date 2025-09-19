import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { AlreadyExistsError } from "~/domain/errors/AlreadyExistsError";
import { unwrapResult } from "~/utils/db.util";
import { ProfileCreate } from "~/validators/profile.validator";

export function createProfileService(app: FastifyInstance) {
	const { db } = app;
	const { cities, genders, countries, education_levels, profiles } = db;

	const createProfile = async (profilePayload: ProfileCreate, userId: number) => {
		const existingProfile = await getProfileByUserId(userId);

		if (existingProfile) {
			throw new AlreadyExistsError("Profile already exists");
		}

		// TODO Implement batch querying lookup tables for existence of row to return all wrong params
		// const [city, gender, country, educationLevel] = await Promise.allSettled([
		// 	db.select().from(cities).where(eq(cities.id, profilePayload.cityId)),
		// 	db.select().from(genders).where(eq(genders.id, profilePayload.genderId)),
		// 	db.select().from(countries).where(eq(countries.id, profilePayload.countryId)),
		// 	db
		// 		.select()
		// 		.from(education_levels)
		// 		.where(eq(education_levels.id, profilePayload.educationLevelId)),
		// ]);

		// if (!city.length) errors.cityId = "Invalid cityId";
		// if (!gender.length) errors.genderId = "Invalid genderId";
		// if (!country.length) errors.countryId = "Invalid countryId";
		// if (!educationLevel.length) errors.educationLevelId = "Invalid educationLevelId";

		// if (Object.keys(errors).length) {
		// 	return { success: false, errors };
		// }

		const result = await db
			.insert(profiles)
			.values({
				...profilePayload,
				userId: userId,
			})
			.returning();

		const newProfile = unwrapResult(result);

		return newProfile;
	};

	const getProfileByUserId = async (userId: number) => {
		const result = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);

		return result.length > 0;
	};

	return {
		createProfile,
		getProfileByUserId,
	};
}

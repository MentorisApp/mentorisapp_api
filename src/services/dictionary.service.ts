import { FastifyInstance } from "fastify";

export function createDictionaryService(app: FastifyInstance) {
	const { db } = app;
	const { cities, countries, genders, education_levels } = db;

	async function getCitiesDictionary() {
		const record = await db.select().from(cities);
		return record;
	}

	async function getGendersDictionary() {
		const record = await db.select().from(genders);
		return record;
	}

	async function getCountriesDictionary() {
		const record = await db.select().from(countries);
		return record;
	}

	async function getEducationLevelsDictionary() {
		const record = await db.select().from(education_levels);
		return record;
	}

	return {
		getCitiesDictionary,
		getCountriesDictionary,
		getEducationLevelsDictionary,
		getGendersDictionary,
	};
}

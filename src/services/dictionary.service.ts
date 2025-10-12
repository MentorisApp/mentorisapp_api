import { FastifyInstance } from "fastify";

export function createDictionaryService(app: FastifyInstance) {
	const { db } = app;

	async function getCitiesDictionary() {
		return await db.select().from(db.cities);
	}

	async function getGendersDictionary() {
		return await db.select().from(db.genders);
	}

	async function getCountriesDictionary() {
		return await db.select().from(db.countries);
	}

	async function getEducationLevelsDictionary() {
		return await db.select().from(db.education_levels);
	}

	async function getCategoriesDictionary() {
		return await db.select().from(db.categories);
	}

	return {
		getCitiesDictionary,
		getCategoriesDictionary,
		getCountriesDictionary,
		getEducationLevelsDictionary,
		getGendersDictionary,
	};
}

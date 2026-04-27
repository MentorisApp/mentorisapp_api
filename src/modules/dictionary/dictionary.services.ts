import { cities, offerCategories } from "~/db/schema";
import { App } from "~/types/app.types";

export function createDictionaryService(app: App) {
	const { db } = app;

	async function getCitiesDictionary() {
		return await db.select().from(cities);
	}

	async function getCategoriesDictionary() {
		return await db.select().from(offerCategories);
	}

	return {
		getCitiesDictionary,
		getCategoriesDictionary,
	};
}

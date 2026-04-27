import { App } from "~/types/app.types";

export function createDictionaryService(app: App) {
	const { db } = app;

	async function getCitiesDictionary() {
		return await db.select().from(db.cities);
	}

	async function getCategoriesDictionary() {
		return await db.select().from(db.offerCategories);
	}

	return {
		getCitiesDictionary,
		getCategoriesDictionary,
	};
}

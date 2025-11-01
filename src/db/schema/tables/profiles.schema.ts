import { relations } from "drizzle-orm";
import { integer, pgTable, serial, smallint, text, varchar } from "drizzle-orm/pg-core";

import { cities } from "./cities.schema";
import { countries } from "./countries.schema";
import { education_levels } from "./education_levels.schema";
import { genders } from "./genders.schema";
import { users } from "./users.schema";
import { modColumns } from "../partials/modColumns";
import { timestampColumns } from "../partials/timestampColumns";

export const profiles = pgTable("profiles", {
	id: serial("id").primaryKey(),
	profilePictureUrl: varchar("profile_picture_url", { length: 255 }),
	firstName: varchar("first_name", { length: 50 }).notNull(),
	lastName: varchar("last_name", { length: 50 }).notNull(),
	phone: varchar("phone", { length: 20 }).notNull(),
	age: smallint("age").notNull(),
	homeAddress: text("home_address").notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" })
		.unique(),
	educationLevelId: integer("education_level_id")
		.notNull()
		.references(() => education_levels.id, { onDelete: "restrict" }),
	cityId: integer("city_id")
		.notNull()
		.references(() => cities.id, { onDelete: "restrict" }),
	genderId: integer("gender_id")
		.notNull()
		.references(() => genders.id, { onDelete: "restrict" }),
	countryId: integer("country_id")
		.notNull()
		.references(() => countries.id, { onDelete: "restrict" }),
	...modColumns,
	...timestampColumns,
});

export const profilesRelations = relations(profiles, ({ one }) => ({
	user: one(users, {
		fields: [profiles.userId],
		references: [users.id],
	}),

	educationLevel: one(education_levels, {
		fields: [profiles.educationLevelId],
		references: [education_levels.id],
	}),

	city: one(cities, {
		fields: [profiles.cityId],
		references: [cities.id],
	}),

	country: one(countries, {
		fields: [profiles.countryId],
		references: [countries.id],
	}),

	gender: one(genders, {
		fields: [profiles.genderId],
		references: [genders.id],
	}),
}));

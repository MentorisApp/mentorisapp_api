import { timestamp } from "drizzle-orm/pg-core";

export const timestampColumns = {
	created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updated_at: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		// TODO create global database function and then attach trigger to tables
		.$onUpdate(() => new Date()),
};

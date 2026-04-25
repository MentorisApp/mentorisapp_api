import { timestamp } from "drizzle-orm/pg-core";

export const timestampColumns = {
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		// TODO create global database function and then attach trigger to tables
		.$onUpdate(() => new Date()),
};

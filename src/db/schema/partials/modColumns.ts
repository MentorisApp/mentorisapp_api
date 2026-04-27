import { integer, text, timestamp } from "drizzle-orm/pg-core";

import { STATUS_ENUM } from "../enums/db.enum.schema";

export const modColumns = {
	mod_status: STATUS_ENUM("mod_status").notNull().default("PENDING"),
	mod_by: integer("mod_by"),
	mod_at: timestamp("mod_at", { withTimezone: true }),
	mod_reason: text("mod_reason"),
};

import { integer, text, timestamp } from "drizzle-orm/pg-core";
import { STATUS_ENUM } from "../enums/db.enum.schema";

export const modColumns = {
	modStatus: STATUS_ENUM("mod_status").notNull().default("PENDING"),
	modBy: integer("mod_by"),
	modAt: timestamp("mod_at"),
	modReason: text("mod_reason"),
};

import { pgTable } from "drizzle-orm/pg-core";

import { dictionaryColumns } from "../../partials/dictionaryColumns";

// TODO connect city table to offer table
export const cities = pgTable("cities", dictionaryColumns);

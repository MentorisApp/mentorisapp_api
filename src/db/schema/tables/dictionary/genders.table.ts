import { pgTable } from "drizzle-orm/pg-core";

import { dictionaryColumns } from "../../partials/dictionaryColumns";

export const genders = pgTable("genders", dictionaryColumns);

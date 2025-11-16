import { NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "../db/schema/index";

export type AppDb = NodePgDatabase<typeof schema> & typeof schema;

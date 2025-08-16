import { env } from "@env";
import { drizzle } from "drizzle-orm/node-postgres";
import { rolesPermissions } from "./schema/joins/roles-permissions.schema";
import { permissions } from "./schema/permissions.schema";
import { roles } from "./schema/roles.schema";
import { users } from "./schema/users.schema";

export const db = drizzle(env.DATABASE_URL, {
	schema: { users, roles, rolesPermissions, permissions },
});

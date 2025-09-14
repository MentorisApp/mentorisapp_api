import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { permissions } from "../tables/permissions.schema";
import { roles } from "../tables/roles.schema";

export const roles_permissions = pgTable(
	"roles_permissions",
	{
		roleId: integer("role_id")
			.notNull()
			.references(() => roles.id, { onDelete: "cascade" }),
		permissionId: integer("permission_id")
			.notNull()
			.references(() => permissions.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

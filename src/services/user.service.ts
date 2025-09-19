import { eq, sql } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { unwrapResult } from "~/utils/db.util";
import { UserCreate } from "~/validators/user.validator";

export function createUserService(app: FastifyInstance) {
	const { db } = app;
	const { users, roles, roles_permissions } = db;

	const createUser = async (user: UserCreate) => {
		return await db.transaction(async (tx) => {
			const userRoleWithPermissions = await tx
				.select({
					roleId: roles.id,
					roleName: roles.name,
					permissionIds: sql<number[]>`ARRAY_AGG(${roles_permissions.permissionId})`,
				})
				.from(roles)
				.leftJoin(roles_permissions, eq(roles_permissions.roleId, roles.id))
				.where(eq(roles.name, "USER"))
				.groupBy(roles.id, roles.name);

			const roleId = userRoleWithPermissions[0].roleId;
			const permissionIds = userRoleWithPermissions[0].permissionIds;

			const resultUserCreate = await tx
				.insert(users)
				.values({
					email: user.email,
					password: user.password,
					roleId,
				})
				.returning();

			const newUser = unwrapResult(resultUserCreate);

			return {
				...newUser,
				permissionIds,
			};
		});
	};

	const getUserByEmail = async (email: UserCreate["email"]) => {
		const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

		return user[0];
	};

	const checkUserExistsByEmail = async (email: UserCreate["email"]): Promise<boolean> => {
		const result = await db.select().from(users).where(eq(users.email, email)).limit(1);

		return result.length > 0;
	};

	const getUserPermission = async (userId: number) => {
		const result = await db
			.select({
				roleId: users.roleId,
				permissionIds: sql<number[]>`
      COALESCE(ARRAY_AGG(${roles_permissions.permissionId}), '{}')
    `,
			})
			.from(users)
			.leftJoin(roles, eq(users.roleId, roles.id))
			.leftJoin(roles_permissions, eq(roles_permissions.roleId, roles.id))
			.where(eq(users.id, userId))
			.groupBy(users.roleId);

		const { roleId, permissionIds } = unwrapResult(result);

		return {
			roleId,
			permissionIds,
		};
	};

	return {
		createUser,
		getUserByEmail,
		checkUserExistsByEmail,
		getUserPermission,
	};
}

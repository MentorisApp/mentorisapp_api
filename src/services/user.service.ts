import { eq } from "drizzle-orm";
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
					permissionId: roles_permissions.permissionId,
				})
				.from(roles)
				.leftJoin(roles_permissions, eq(roles_permissions.roleId, roles.id))
				.where(eq(roles.name, "USER"));

			const defaultRoleId = userRoleWithPermissions[0]?.roleId;

			const permissionIds = userRoleWithPermissions
				.map((r) => r.permissionId)
				.filter((id) => id !== null);

			const resultUserCreate = await tx
				.insert(users)
				.values({
					email: user.email,
					password: user.password,
					roleId: defaultRoleId,
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
				permissionId: roles_permissions.permissionId,
			})
			.from(users)
			.leftJoin(roles, eq(users.roleId, roles.id))
			.leftJoin(roles_permissions, eq(roles_permissions.roleId, roles.id))
			.where(eq(users.id, userId));

		const roleId = result[0].roleId;
		const permissionIds = result
			.map((r) => r.permissionId)
			.filter((id): id is number => id !== null);

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

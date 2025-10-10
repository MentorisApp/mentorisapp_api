import { and, eq, gt, sql } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { VerificationTokenContext } from "~/db/schema/enums/db.enum.schema";
import { unwrapResult } from "~/utils/db.util";
import { UserCreate } from "~/validators/user.validator";

export function createUserService(app: FastifyInstance) {
	const { db } = app;
	const { users, roles, roles_permissions, verification_tokens } = db;

	async function createUser(user: UserCreate) {
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
	}

	async function getUserByEmail(email: UserCreate["email"]) {
		const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
		return user[0];
	}

	async function checkUserExistsByEmail(email: UserCreate["email"]) {
		const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
		return result.length > 0;
	}

	async function getUserPermission(userId: number) {
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
	}

	async function verifyUser(userId: number) {
		await db
			.update(users)
			.set({ isVerified: true, updatedAt: new Date() })
			.where(eq(users.id, userId));
	}

	async function getUserByVerificationToken(token: string, context: VerificationTokenContext) {
		const result = await db
			.select({
				user: users,
			})
			.from(verification_tokens)
			.innerJoin(users, eq(verification_tokens.userId, users.id))
			.where(
				and(
					eq(verification_tokens.token, token),
					eq(verification_tokens.context, context),
					eq(verification_tokens.used, false),
					gt(verification_tokens.expiresAt, new Date()),
				),
			)
			.limit(1);

		// TODO weird data structure reutrn fix and flatten
		return result[0] ?? null;
	}

	return {
		getUserByVerificationToken,
		verifyUser,
		createUser,
		getUserByEmail,
		checkUserExistsByEmail,
		getUserPermission,
	};
}

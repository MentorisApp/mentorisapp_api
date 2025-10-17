import { and, eq, gt } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { VerificationTokenContext } from "~/db/schema/enums/db.enum.schema";
import { NotFoundError } from "~/domain/errors/NotFoundError";
import { unwrapResult } from "~/utils/db.util";
import { UserCreate } from "~/validators/user.validator";

export function createUserService(app: FastifyInstance) {
	const { db } = app;
	const { users, roles, verification_tokens } = db;

	async function createUser(user: UserCreate) {
		return await db.transaction(async (tx) => {
			const userRoleToAssign = "USER";

			const role = await tx.query.roles.findFirst({
				where: eq(roles.name, userRoleToAssign),
			});

			const roleId = role?.id;

			if (!roleId) {
				throw new NotFoundError("User role assignment went wrong.");
			}

			const createdUser = await tx
				.insert(users)
				.values({
					email: user.email,
					password: user.password,
					roleId: roleId,
				})
				.returning();

			return unwrapResult(createdUser);
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
		const userWithRoleAndPermissions = await db.query.users.findFirst({
			where: eq(users.id, userId),
			columns: {},
			with: {
				role: {
					columns: { name: true },
					with: {
						rolesPermissions: {
							columns: {},
							with: {
								permission: true,
							},
						},
					},
				},
			},
		});

		if (!userWithRoleAndPermissions) {
			throw new NotFoundError("User permissions not found");
		}

		const role = userWithRoleAndPermissions.role.name;

		const permissions = userWithRoleAndPermissions.role.rolesPermissions.map(
			(t) => t.permission.name,
		);

		return {
			role,
			permissions,
		};
	}

	async function verifyUser(userId: number) {
		await db
			.update(users)
			.set({ isVerified: true, updatedAt: new Date() })
			.where(eq(users.id, userId));
	}

	async function getUserWithValidVerificationToken(
		token: string,
		context: VerificationTokenContext,
	) {
		const result = await db
			.select({
				user: users,
				token: verification_tokens,
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

		// TODO weird data structure return, fix and flatten
		return result[0] ?? null;
	}

	async function updateUserPassword(userId: number, hashedPassword: string) {
		await db
			.update(users)
			.set({ password: hashedPassword, updatedAt: new Date() })
			.where(eq(users.id, userId));
	}

	return {
		updateUserPassword,
		getUserWithValidVerificationToken,
		verifyUser,
		createUser,
		getUserByEmail,
		checkUserExistsByEmail,
		getUserPermission,
	};
}

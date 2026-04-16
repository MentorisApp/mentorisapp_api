import { and, eq, gt } from "drizzle-orm";
import { FastifyInstance } from "fastify";

import { Role } from "~/constants/roles";
import { VerificationTokenContext } from "~/db/schema/enums/db.enum.schema";
import { NotFoundError } from "~/errors/generic/NotFoundError";
import { unwrapResult } from "~/utils/db.util";
import { hashUtil } from "~/utils/hash.util";

import { CreateUserInput } from "./user.types";

export function createUserService(app: FastifyInstance) {
	const { db } = app;
	const { users, roles, verification_tokens, profiles } = db;

	async function createUser(user: CreateUserInput) {
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

	async function getUserByEmail(email: string) {
		const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
		return user[0];
	}

	async function getUserWithProfile(userId: number) {
		const user = await db
			.select({
				id: users.id,
				email: users.email,
				// profile fields
				name: profiles.name,
				profilePictureUrl: profiles.profilePictureUrl,
			})
			.from(users)
			.leftJoin(profiles, eq(profiles.userId, users.id))
			.where(eq(users.id, userId))
			.limit(1);

		if (!user[0]) {
			throw new NotFoundError("User not found.");
		}

		return user[0];
	}

	async function checkUserExistsByEmail(email: CreateUserInput["email"]) {
		const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
		return result.length > 0;
	}

	async function getUserRole(userId: number) {
		const userRole = await db.query.users.findFirst({
			where: eq(users.id, userId),
			columns: {},
			with: {
				role: {
					columns: { name: true },
				},
			},
		});

		if (!userRole) {
			throw new NotFoundError("User role not found");
		}

		const role = userRole.role.name as Role;

		return {
			role,
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
		const hashedPayloadToken = hashUtil.token.hash(token);

		const result = await db
			.select({
				user: users,
				token: verification_tokens,
			})
			.from(verification_tokens)
			.innerJoin(users, eq(verification_tokens.userId, users.id))
			.where(
				and(
					eq(verification_tokens.token, hashedPayloadToken),
					eq(verification_tokens.context, context),
					eq(verification_tokens.used, false),
					gt(verification_tokens.expiresAt, new Date()),
				),
			)
			.limit(1);

		return unwrapResult(result, "Verification request token not found");
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
		getUserRole,
		verifyUser,
		createUser,
		getUserByEmail,
		checkUserExistsByEmail,
		getUserWithProfile,
	};
}

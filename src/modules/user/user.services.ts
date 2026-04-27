import { and, eq, gt } from "drizzle-orm";

import {
	profiles,
	userRoles,
	users,
	type VerificationTokenContext,
	verificationTokens,
} from "~/db/schema";
import { NotFoundError } from "~/shared/errors/generic/NotFoundError";
import { App } from "~/types/app.types";
import { unwrapResult } from "~/utils/db.util";
import { hashUtil } from "~/utils/hash.util";

import { CreateUserInput } from "./user.types";
import { Role } from "../auth/auth.constants";

export function createUserService(app: App) {
	const { db } = app;

	async function createUser(user: CreateUserInput) {
		return await db.transaction(async (tx) => {
			const userRoleToAssign = "USER";

			const role = await tx.query.userRoles.findFirst({
				where: eq(userRoles.label, userRoleToAssign),
			});

			const roleId = role?.id;

			if (!roleId) throw new NotFoundError("User role assignment went wrong.");

			const createdUser = await tx
				.insert(users)
				.values({
					email: user.email,
					password: user.password,
					role_id: roleId,
				})
				.returning();

			return unwrapResult(createdUser);
		});
	}

	async function getUserByEmail(email: string) {
		const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

		if (!user) throw new NotFoundError("User not found");

		return user;
	}

	async function getUserWithProfile(userId: number) {
		const [user] = await db
			.select({
				id: users.id,
				email: users.email,
				isVerified: users.is_verified,
				// profile fields
				name: profiles.name,
				profilePictureUrl: profiles.profile_picture_url,
			})
			.from(users)
			.innerJoin(profiles, eq(profiles.user_id, users.id))
			.where(eq(users.id, userId))
			.limit(1);

		if (!user) throw new NotFoundError("User not found.");

		return user;
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
				userRole: {
					columns: { label: true },
				},
			},
		});

		if (!userRole) {
			throw new NotFoundError("User role not found");
		}

		const role = userRole.userRole.label as Role;

		return {
			role,
		};
	}

	async function verifyUser(userId: number) {
		await db
			.update(users)
			.set({ is_verified: true, updated_at: new Date() })
			.where(eq(users.id, userId));
	}

	async function getUserWithValidVerificationToken(
		token: string,
		context: VerificationTokenContext,
	) {
		const hashedPayloadToken = hashUtil.token.hash(token);

		const [result] = await db
			.select({
				user: users,
				token: verificationTokens,
			})
			.from(verificationTokens)
			.innerJoin(users, eq(verificationTokens.user_id, users.id))
			.where(
				and(
					eq(verificationTokens.token, hashedPayloadToken),
					eq(verificationTokens.context, context),
					eq(verificationTokens.used, false),
					gt(verificationTokens.expires_at, new Date()),
				),
			)
			.limit(1);

		if (!result) throw new NotFoundError("Verification request token or user not found");

		return result;
	}

	async function updateUserPassword(userId: number, hashedPassword: string) {
		await db
			.update(users)
			.set({ password: hashedPassword, updated_at: new Date() })
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

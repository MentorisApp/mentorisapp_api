import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { unwrapResult } from "~/utils/db.util";
import { UserCreate, UserUpdate } from "./user.validator";

export function createUserService(app: FastifyInstance) {
	const { db } = app;

	const getAllUsers = async () => {
		const result = db.select().from(db.users);
		return result;
	};

	const getUserById = async (id: number) => {
		const result = await db
			.select()
			.from(db.users)
			.where(eq(db.users.id, id))
			.limit(1);
		// TODO unwrapResult message tailored to this entity USER
		return unwrapResult(result, "UNWRAP RESULT ERROR PLACEHOLDER");
	};

	const createUser = async (user: UserCreate) => {
		const result = await db.insert(db.users).values(user).returning();
		return unwrapResult(result, "UNWRAP RESULT ERROR PLACEHOLDER");
	};

	const updateUser = async (user: UserUpdate) => {
		const result = await db
			.update(db.users)
			.set(user)
			.where(eq(db.users.id, user.id))
			.returning();
		return unwrapResult(result, "UNWRAP RESULT ERROR PLACEHOLDER");
	};

	const deleteUser = async (id: number) => {
		const result = await db
			.delete(db.users)
			.where(eq(db.users.id, id))
			.returning();
		return unwrapResult(result, "UNWRAP RESULT ERROR PLACEHOLDER");
	};

	return {
		getAllUsers,
		getUserById,
		createUser,
		updateUser,
		deleteUser,
	};
}

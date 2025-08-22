import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { UserCreate, UserUpdate } from "./user.validator";

export function createUserService(app: FastifyInstance) {
	const { db } = app;

	const getAllUsers = async () => {
		return db.select().from(db.users);
	};

	const getUserById = async (id: number) => {
		const users = await db
			.select()
			.from(db.users)
			.where(eq(db.users.id, id))
			.limit(1);

		return users[0];
	};

	const createUser = async (user: UserCreate) => {
		return db.insert(db.users).values(user).returning();
	};

	const updateUser = async (user: UserUpdate) => {
		return db
			.update(db.users)
			.set(user)
			.where(eq(db.users.id, user.id))
			.returning();
	};

	const deleteUser = async (id: number) => {
		return db.delete(db.users).where(eq(db.users.id, id)).returning();
	};

	return {
		getAllUsers,
		getUserById,
		createUser,
		updateUser,
		deleteUser,
	};
}

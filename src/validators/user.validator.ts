import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";
import { users } from "~/db/schema";
import { PasswordSchema } from "./zod-shared.validator";

export const UserCreateSchema = createInsertSchema(users)
	.omit({ id: true, createdAt: true, roleId: true })
	.extend({
		email: z.email("Email format is incorrect."),
		password: PasswordSchema,
	});

export const UserUpdateSchema = createUpdateSchema(users)
	.required({ id: true, createdAt: true, roleId: true })
	.extend({
		email: z.email("Email format is incorrect."),
		password: PasswordSchema,
	});

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;

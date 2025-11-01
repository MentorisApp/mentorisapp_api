import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

import { users } from "~/db/schema";

import { PasswordSchema, UuidSchema } from "./zod-shared.validator";

export const UserCreateSchema = createInsertSchema(users)
	.omit({ id: true, createdAt: true, roleId: true, isVerified: true })
	.extend({
		email: z.email("Email format is incorrect."),
		password: PasswordSchema,
	})
	.strict();

export const UserUpdatePasswordSchema = createUpdateSchema(users)
	.pick({ password: true })
	.required({ password: true })
	.extend({
		token: UuidSchema,
		password: PasswordSchema,
	})
	.strict();

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdatePassword = z.infer<typeof UserUpdatePasswordSchema>;

import { users } from "@schema/users";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

export const userCreateSchema = createInsertSchema(users)
	.omit({ id: true, createdAt: true })
	.extend({
		email: z.email("Email format is incorrect."),
	});

export const userUpdateSchema = createUpdateSchema(users)
	.required({ id: true })
	.extend({
		email: z.email("Email format is incorrect."),
	});

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

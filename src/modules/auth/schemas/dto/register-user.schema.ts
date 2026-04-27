import z from "zod";

import { EmailSchema, PasswordSchema } from "~/shared/schemas/general.schema";

export const RegisterUserRequestSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
		name: z.string().min(2, "Name must be longer than 1 character"),
	})
	.strict();

export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>;

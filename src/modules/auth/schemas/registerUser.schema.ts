import z from "zod";

import { EmailSchema, PasswordSchema } from "~/utils/zod-shared.validator";

export const RegisterUserRequestSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export const registerUserRouteSchema = {
	body: RegisterUserRequestSchema,
};

export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>;

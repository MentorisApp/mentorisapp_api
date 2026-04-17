import z from "zod";

import { EmailSchema, PasswordSchema } from "~/utils/zod-shared.validator";

export const LoginRequestSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const loginRouteSchema = {
	body: LoginRequestSchema,
};

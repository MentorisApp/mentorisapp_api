import z from "zod";

import { EmailSchema, PasswordSchema } from "~/shared/schemas/general.schema";

export const LoginRequestSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

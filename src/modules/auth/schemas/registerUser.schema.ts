import { FastifySchema } from "fastify";
import z from "zod";

import { EmailSchema, PasswordSchema } from "~/utils/zod-shared.validator";

export const RegisterUserRequestSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>;

export const registerUserRouteSchema: FastifySchema = {
	body: RegisterUserRequestSchema,
};

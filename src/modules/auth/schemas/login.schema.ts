import { FastifySchema } from "fastify";
import z from "zod";

import { EmailSchema, PasswordSchema } from "~/utils/zod-shared.validator";

export const LoginRequestSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export const LoginResponseSchema = z.object({
	success: z.boolean(),
	data: z.null(),
	message: z.string(),
	code: z.string(),
	domainCode: z.null(),
});

export const loginRouteSchema = {
	body: LoginRequestSchema,
	// response: {
	// 	[HttpStatus.NO_CONTENT]: LoginResponseSchema,
	// },
} satisfies FastifySchema;

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

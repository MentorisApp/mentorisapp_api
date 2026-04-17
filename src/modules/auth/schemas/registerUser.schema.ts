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

export const RegisterUserResponseSchema = z.null();

export type RegisterUserResponse = z.infer<typeof RegisterUserResponseSchema>;

export const registerUserRouteSchema: FastifySchema = {
	body: RegisterUserRequestSchema,
	// response: {
	// 	[HttpStatus.CREATED]: emptySuccessResponseSchema,
	// 	[HttpStatus.BAD_REQUEST]: RegisterUserRequestSchema,
	// },
};

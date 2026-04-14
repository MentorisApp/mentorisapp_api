import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { successResponseSchema } from "~/utils/http-schema.util";
import { EmailSchema, PasswordSchema } from "~/utils/zod-shared.validator";

export const LoginRequestSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z
	.object({
		message: z.string(),
	})
	.strict();

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const loginRouteSchema = {
	body: LoginRequestSchema,
	response: {
		[HttpStatus.OK]: successResponseSchema(LoginResponseSchema),
	},
};

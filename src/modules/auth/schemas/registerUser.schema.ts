import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { emptySuccessResponseSchema } from "~/utils/http-schema.util";
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

export const registerUserRouteSchema = {
	body: RegisterUserRequestSchema,
	response: {
		[HttpStatus.CREATED]: emptySuccessResponseSchema,
	},
};

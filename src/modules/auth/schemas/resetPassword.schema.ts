import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { emptySuccessResponseSchema } from "~/utils/http-schema.util";
import { PasswordSchema, UuidSchema } from "~/utils/zod-shared.validator";

export const ResetPasswordRequestSchema = z
	.object({
		token: UuidSchema,
		password: PasswordSchema,
	})
	.strict();

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

export const ResetPasswordResponseSchema = z.null();

export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;

export const resetPasswordRouteSchema = {
	body: ResetPasswordRequestSchema,
	response: {
		[HttpStatus.OK]: emptySuccessResponseSchema,
	},
};

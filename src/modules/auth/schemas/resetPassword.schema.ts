import z from "zod";

import { PasswordSchema, UuidSchema } from "~/utils/zod-shared.validator";

export const ResetPasswordRequestSchema = z
	.object({
		token: UuidSchema,
		password: PasswordSchema,
	})
	.strict();

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

export const resetPasswordRouteSchema = {
	body: ResetPasswordRequestSchema,
};

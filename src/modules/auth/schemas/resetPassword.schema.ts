import z from "zod";

import { PasswordSchema, UuidSchema } from "~/shared/schemas/general.schema";

export const ResetPasswordRequestSchema = z
	.object({
		token: UuidSchema,
		password: PasswordSchema,
	})
	.strict();

export const resetPasswordRouteSchema = {
	body: ResetPasswordRequestSchema,
};

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

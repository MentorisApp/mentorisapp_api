import z from "zod";

import { PasswordSchema, UuidSchema } from "~/shared/schemas/general.schema";

export const ResetPasswordRequestSchema = z
	.object({
		token: UuidSchema,
		newPassword: PasswordSchema,
	})
	.strict();

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

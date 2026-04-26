import z from "zod";

import { EmailSchema } from "~/shared/schemas/general.schema";

export const RequestPasswordResetRequestSchema = z
	.object({
		email: EmailSchema,
	})
	.strict();

export type RequestPasswordResetRequest = z.infer<typeof RequestPasswordResetRequestSchema>;

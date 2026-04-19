import z from "zod";

import { EmailSchema } from "~/utils/zod-shared.validator";

export const RequestPasswordResetRequestSchema = z
	.object({
		email: EmailSchema,
	})
	.strict();

export const requestPasswordResetRouteSchema = {
	body: RequestPasswordResetRequestSchema,
};

export type RequestPasswordResetRequest = z.infer<typeof RequestPasswordResetRequestSchema>;

import z from "zod";

import { EmailSchema } from "~/utils/zod-shared.validator";

export const RequestPasswordResetRequestSchema = z
	.object({
		email: EmailSchema,
	})
	.strict();

export type RequestPasswordResetRequest = z.infer<typeof RequestPasswordResetRequestSchema>;

export const requestPasswordResetRouteSchema = {
	body: RequestPasswordResetRequestSchema,
};

import z from "zod";

import { EmailSchema } from "~/utils/zod-shared.validator";

export const ResendVerificationLinkRequestSchema = z
	.object({
		email: EmailSchema,
	})
	.strict();

export type ResendVerificationLinkRequest = z.infer<typeof ResendVerificationLinkRequestSchema>;

export const resendVerificationLinkRouteSchema = {
	body: ResendVerificationLinkRequestSchema,
};

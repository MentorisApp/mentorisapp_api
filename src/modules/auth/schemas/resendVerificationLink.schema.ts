import z from "zod";

import { EmailSchema } from "~/utils/zod-shared.validator";

export const ResendVerificationLinkRequestSchema = z
	.object({
		email: EmailSchema,
	})
	.strict();

export const resendVerificationLinkRouteSchema = {
	body: ResendVerificationLinkRequestSchema,
};

export type ResendVerificationLinkRequest = z.infer<typeof ResendVerificationLinkRequestSchema>;

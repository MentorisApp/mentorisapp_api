import z from "zod";

import { EmailSchema } from "~/shared/schemas/general.schema";

export const ResendVerificationLinkRequestSchema = z
	.object({
		email: EmailSchema,
	})
	.strict();

export const resendVerificationLinkRouteSchema = {
	body: ResendVerificationLinkRequestSchema,
};

export type ResendVerificationLinkRequest = z.infer<typeof ResendVerificationLinkRequestSchema>;

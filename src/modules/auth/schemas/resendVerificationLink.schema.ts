import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { emptySuccessResponseSchema } from "~/utils/http-schema.util";
import { EmailSchema } from "~/utils/zod-shared.validator";

export const ResendVerificationLinkRequestSchema = z
	.object({
		email: EmailSchema,
	})
	.strict();

export type ResendVerificationLinkRequest = z.infer<typeof ResendVerificationLinkRequestSchema>;

export const ResendVerificationLinkResponseSchema = z.null();

export type ResendVerificationLinkResponse = z.infer<typeof ResendVerificationLinkResponseSchema>;

export const resendVerificationLinkRouteSchema = {
	body: ResendVerificationLinkRequestSchema,
	response: {
		[HttpStatus.ACCEPTED]: emptySuccessResponseSchema,
	},
};

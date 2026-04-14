import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { emptySuccessResponseSchema } from "~/utils/http-schema.util";
import { EmailSchema } from "~/utils/zod-shared.validator";

export const RequestPasswordResetRequestSchema = z
	.object({
		email: EmailSchema,
	})
	.strict();

export type RequestPasswordResetRequest = z.infer<typeof RequestPasswordResetRequestSchema>;

export const RequestPasswordResetResponseSchema = z.null();

export type RequestPasswordResetResponse = z.infer<typeof RequestPasswordResetResponseSchema>;

export const requestPasswordResetRouteSchema = {
	body: RequestPasswordResetRequestSchema,
	response: {
		[HttpStatus.ACCEPTED]: emptySuccessResponseSchema,
	},
};

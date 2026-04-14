import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { successResponseSchema } from "~/utils/http-schema.util";
import { UuidSchema } from "~/utils/zod-shared.validator";

export const VerifyAccountQuerySchema = z
	.object({
		token: UuidSchema,
	})
	.strict();

export type VerifyAccountQuery = z.infer<typeof VerifyAccountQuerySchema>;

export const VerifyAccountResponseSchema = z
	.object({
		message: z.string(),
	})
	.strict();

export type VerifyAccountResponse = z.infer<typeof VerifyAccountResponseSchema>;

export const verifyAccountRouteSchema = {
	querystring: VerifyAccountQuerySchema,
	response: {
		[HttpStatus.OK]: successResponseSchema(VerifyAccountResponseSchema),
	},
};

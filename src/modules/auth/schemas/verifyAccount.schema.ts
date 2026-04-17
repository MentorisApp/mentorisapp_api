import z from "zod";

import { UuidSchema } from "~/utils/zod-shared.validator";

export const VerifyAccountQuerySchema = z
	.object({
		token: UuidSchema,
	})
	.strict();

export type VerifyAccountQuery = z.infer<typeof VerifyAccountQuerySchema>;

export const verifyAccountRouteSchema = {
	querystring: VerifyAccountQuerySchema,
};

import z from "zod";

import { UuidSchema } from "~/utils/zod-shared.validator";

export const VerifyAccountQuerySchema = z
	.object({
		token: UuidSchema,
	})
	.strict();

export const verifyAccountRouteSchema = {
	querystring: VerifyAccountQuerySchema,
};

export type VerifyAccountQuery = z.infer<typeof VerifyAccountQuerySchema>;

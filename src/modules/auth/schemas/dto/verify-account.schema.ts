import z from "zod";

import { UuidSchema } from "~/shared/schemas/general.schema";

export const VerifyAccountQuerySchema = z
	.object({
		token: UuidSchema,
	})
	.strict();

export type VerifyAccountQuery = z.infer<typeof VerifyAccountQuerySchema>;

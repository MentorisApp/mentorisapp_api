import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { successResponseSchema } from "~/utils/http-schema.util";

export const RefreshTokenResponseSchema = z
	.object({
		accessToken: z.string(),
	})
	.strict();

export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;

export const refreshTokenRouteSchema = {
	response: {
		[HttpStatus.OK]: successResponseSchema(RefreshTokenResponseSchema),
	},
};

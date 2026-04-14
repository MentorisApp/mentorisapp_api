import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { successResponseSchema } from "~/utils/http-schema.util";

export const GetCurrentUserResponseSchema = z
	.object({
		id: z.number().int().positive(),
		email: z.string().email(),
		name: z.string().nullable(),
		profilePictureUrl: z.string().nullable(),
	})
	.strict();

export type GetCurrentUserResponse = z.infer<typeof GetCurrentUserResponseSchema>;

export const getCurrentUserRouteSchema = {
	response: {
		[HttpStatus.OK]: successResponseSchema(GetCurrentUserResponseSchema),
	},
};

import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export const LogoutResponseSchema = z.null();

export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

export const logoutRouteSchema = {
	response: {
		[HttpStatus.NO_CONTENT]: LogoutResponseSchema,
	},
};

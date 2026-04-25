import z from "zod";

import { HttpStatus } from "~/enums/httpStatus.enum";
import { EmailSchema, PasswordSchema } from "~/shared/schemas/general.schema";
import { ApiResponseNoContentSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

export const LoginRequestSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const loginRouteSchema = createRouteSchema({
	tags: ["Auth"],
	summary: "Log in user",
	body: LoginRequestSchema,
	response: {
		[HttpStatus.NO_CONTENT]: ApiResponseNoContentSchema,
	},
});

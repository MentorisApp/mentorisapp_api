import z from "zod";

import { HttpStatus } from "~/enums/httpStatus.enum";
import { EmailSchema, PasswordSchema } from "~/shared/schemas/general.schema";
import { ApiResponseNoContentSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

const RegisterUserRequestSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export type RegisterUserRequest = z.infer<typeof RegisterUserRequestSchema>;

export const registerUserRouteSchema = createRouteSchema({
	tags: ["Auth"],
	summary: "Creates/register user then sends verification email",
	body: RegisterUserRequestSchema,
	response: { [HttpStatus.NO_CONTENT]: ApiResponseNoContentSchema },
});

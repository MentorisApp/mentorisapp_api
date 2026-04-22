import z from "zod";

import { HttpStatus } from "~/enums/httpStatus.enum";
import { EmailSchema, PasswordSchema } from "~/shared/schemas/general.schema";
import { ApiResponseNoContentSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

const RegisterUserPayloadSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export const registerUserRouteSchema = createRouteSchema({
	tags: ["Auth"],
	summary: "Creates user then sends verification email",
	body: RegisterUserPayloadSchema,
	response: { [HttpStatus.NO_CONTENT]: ApiResponseNoContentSchema },
});

export type RegisterUserPayload = z.infer<typeof RegisterUserPayloadSchema>;

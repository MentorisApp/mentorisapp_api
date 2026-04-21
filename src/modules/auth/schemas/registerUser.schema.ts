import { FastifySchema } from "fastify";
import z from "zod";

import { HttpStatus } from "~/enums/httpStatus.enum";
import { ApiResponseNoContent } from "~/shared/schemas/apiResponse.schema";
import { EmailSchema, PasswordSchema } from "~/utils/zod-shared.validator";

const RegisterUserPayloadSchema = z
	.object({
		email: EmailSchema,
		password: PasswordSchema,
	})
	.strict();

export const registerUserRouteSchema = {
	tags: ["Auth"],
	summary: "Creates user then sends verification email",
	body: RegisterUserPayloadSchema,
	response: {
		[HttpStatus.CREATED]: ApiResponseNoContent,
	},
} satisfies FastifySchema;

export type RegisterUserPayload = z.infer<typeof RegisterUserPayloadSchema>;

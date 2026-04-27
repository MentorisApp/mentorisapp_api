import z from "zod";

import { SwaggerTags } from "~/constants/swaggerTags";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { EmailDtoSchema } from "~/shared/schemas/general.schema";
import {
	ApiResponseNoContentSchema,
	ApiResponseSchema,
} from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

import { LoginRequestSchema } from "../dto/login.schema";
import { RegisterUserRequestSchema } from "../dto/register-user.schema";
import { RequestPasswordResetRequestSchema } from "../dto/request-password-reset.schema";
import { ResendVerificationLinkRequestSchema } from "../dto/resend-verification-link.schema";
import { ResetPasswordRequestSchema } from "../dto/reset-password.schema";
import { VerifyAccountQuerySchema } from "../dto/verify-account.schema";

const TAG = SwaggerTags.AUTH;

export const loginRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Login user",
	body: LoginRequestSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(EmailDtoSchema.extend({ isVerified: z.boolean() })),
	},
});
export const logoutRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Logout user",
	response: {
		[HttpStatus.NO_CONTENT]: ApiResponseNoContentSchema,
	},
});

export const registerRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Register user and send verification email",
	body: RegisterUserRequestSchema,
	response: {
		[HttpStatus.CREATED]: ApiResponseSchema(EmailDtoSchema),
	},
});

export const refreshAccessTokenRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Refresh user token",
	response: {
		[HttpStatus.NO_CONTENT]: ApiResponseNoContentSchema,
	},
});

export const verifyAccountRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Verify user account",
	querystring: VerifyAccountQuerySchema,
	response: {
		[HttpStatus.NO_CONTENT]: ApiResponseNoContentSchema,
	},
});

export const requestPasswordResetRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Request password reset via email",
	body: RequestPasswordResetRequestSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(EmailDtoSchema),
	},
});

export const resetPasswordRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Update user password",
	body: ResetPasswordRequestSchema,
	response: {
		[HttpStatus.NO_CONTENT]: ApiResponseNoContentSchema,
	},
});

export const resendVerificationLinkRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Resend user account verification email",
	body: ResendVerificationLinkRequestSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(EmailDtoSchema),
	},
});

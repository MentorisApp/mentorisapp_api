import { SwaggerTags } from "~/constants/swaggerTags";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { ApiResponseSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

import { CreateProfileRequestSchema } from "../dto/create-profile.schema";
import { ProfileDtoSchema } from "../dto/profile.dto";
import { UpdateProfileRequestSchema } from "../dto/update-profile.schema";

const TAG = SwaggerTags.PROFILE;

export const createProfileRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Creates profile",
	body: CreateProfileRequestSchema,
	response: {
		[HttpStatus.CREATED]: ApiResponseSchema(ProfileDtoSchema),
	},
});

export const updateProfileRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Updates profile",
	body: UpdateProfileRequestSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(ProfileDtoSchema),
	},
});

export const getProfileRouteSchema = createRouteSchema({
	tags: [TAG],
	summary: "Fetches profile data",
	response: {
		[HttpStatus.OK]: ApiResponseSchema(ProfileDtoSchema),
	},
});

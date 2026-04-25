import { HttpStatus } from "~/enums/httpStatus.enum";
import { ApiResponseSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

import { CreateProfileRequestSchema } from "../dto/create-profile.request";
import { ProfileDtoSchema } from "../dto/profile.dto";
import { UpdateProfileRequestSchema } from "../dto/update-profile.request";

export const createProfileRouteSchema = createRouteSchema({
	tags: ["Profile"],
	summary: "Creates profile",
	body: CreateProfileRequestSchema,
	response: {
		[HttpStatus.CREATED]: ApiResponseSchema(ProfileDtoSchema),
	},
});

export const updateProfileRouteSchema = createRouteSchema({
	tags: ["Profile"],
	summary: "Updates profile",
	body: UpdateProfileRequestSchema,
	response: {
		[HttpStatus.OK]: ApiResponseSchema(ProfileDtoSchema),
	},
});

export const getProfileRouteSchema = createRouteSchema({
	tags: ["Profile"],
	summary: "Fetches profile data",
	response: {
		[HttpStatus.OK]: ApiResponseSchema(ProfileDtoSchema),
	},
});

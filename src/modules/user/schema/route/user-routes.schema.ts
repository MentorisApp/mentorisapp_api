import { SwaggerTags } from "~/constants/swaggerTags";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { ApiResponseSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

import { UserDtoSchema } from "../dto/user.dto";

export const getCurrentUserRouteSchema = createRouteSchema({
	tags: [SwaggerTags.USER],
	summary: "Fetch base user data",
	response: {
		[HttpStatus.OK]: ApiResponseSchema(UserDtoSchema),
	},
});

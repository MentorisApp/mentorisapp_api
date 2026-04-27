import { SwaggerTags } from "~/constants/swaggerTags";
import { HttpStatus } from "~/enums/httpStatus.enum";
import { ApiResponseSchema } from "~/shared/schemas/responseSuccess.schema";
import { createRouteSchema } from "~/utils/createRouteSchema.util";

import { DictionaryDtoSchema } from "../dto/dictionary.dto";

const baseConfig = {
	tags: [SwaggerTags.DICTIONARY],
	response: {
		[HttpStatus.OK]: ApiResponseSchema(DictionaryDtoSchema.array()),
	},
};

export const getCitiesRouteSchema = createRouteSchema({
	...baseConfig,
	summary: "Fetch all cities",
});

export const getCategoriesRouteSchema = createRouteSchema({
	...baseConfig,
	summary: "Fetch all categories",
});

import { createSelectSchema } from "drizzle-zod";
import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { cities } from "~/db/schema";
import { successResponseSchema } from "~/utils/http-schema.util";

export const GetCitiesResponseSchema = z.array(createSelectSchema(cities));

export type GetCitiesResponse = z.infer<typeof GetCitiesResponseSchema>;

export const getCitiesRouteSchema = {
	response: {
		[HttpStatus.OK]: successResponseSchema(GetCitiesResponseSchema),
	},
};

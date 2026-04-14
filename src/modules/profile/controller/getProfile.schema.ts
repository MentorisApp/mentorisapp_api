import { createSelectSchema } from "drizzle-zod";
import z from "zod";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { profiles } from "~/db/schema";
import { successResponseSchema } from "~/utils/http-schema.util";

export const GetProfileResponseSchema = createSelectSchema(profiles).pick({
	id: true,
	userId: true,
	profilePictureUrl: true,
});

export type GetProfileResponse = z.infer<typeof GetProfileResponseSchema>;

export const getProfileRouteSchema = {
	response: {
		[HttpStatus.OK]: successResponseSchema(GetProfileResponseSchema),
	},
};

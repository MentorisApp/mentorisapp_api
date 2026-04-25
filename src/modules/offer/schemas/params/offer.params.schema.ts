import z from "zod";

import { createPositiveIntSchema } from "~/shared/schemas/general.schema";

export const offerIdParamsSchema = z.object({
	offerId: createPositiveIntSchema("offerId"),
});

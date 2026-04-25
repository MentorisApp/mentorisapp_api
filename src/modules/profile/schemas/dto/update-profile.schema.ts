import { z } from "zod";

import { CreateProfileRequestSchema } from "./create-profile.schema";

export const UpdateProfileRequestSchema = CreateProfileRequestSchema.partial();

export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;

import { z } from "zod";

import { CreateProfileRequestSchema } from "./create-profile.request";

export const UpdateProfileRequestSchema = CreateProfileRequestSchema.partial();

export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>;

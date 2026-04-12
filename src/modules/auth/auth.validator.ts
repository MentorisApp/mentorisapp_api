import { createInsertSchema } from "drizzle-zod";
import z from "zod";

import { users } from "~/db/schema";
import { PasswordSchema } from "~/utils/zod-shared.validator";

export const LoginUserSchema = createInsertSchema(users)
	.pick({ email: true, password: true })
	.extend({
		email: z.email("Email format is invalid."),
		password: PasswordSchema,
	})
	.strict();

export type LoginUser = z.infer<typeof LoginUserSchema>;

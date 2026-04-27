import z from "zod";

export const LoginRequestSchema = z
	.object({
		email: z.string(),
		password: z.string(),
	})
	.strict();

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

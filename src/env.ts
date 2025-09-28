import { z } from "zod";

const durationRegex = /^(\d+)(ms|s|m|h|d|w|y)$/;

const schema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	PORT: z.coerce.number().int().positive(),
	DATABASE_URL: z.string(),
	JWT_SECRET: z.string(),
	COOKIE_SECRET: z.string(),
	EMAIL_HOST: z.string(),
	EMAIL_AUTH_USER: z.string(),
	EMAIL_AUTH_PASS: z.string(),
	JWT_ACCESS_TOKEN_EXPIRES_IN: z
		.string()
		.regex(durationRegex, "Must be a valid duration like 15m, 1h, 7d"),
	JWT_REFRESH_TOKEN_EXPIRES_IN: z
		.string()
		.regex(durationRegex, "Must be a valid duration like 7d, 1w, 1h"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
	console.error("❌ Invalid environment variables:", JSON.stringify(parsed.error, null, 4));
	process.exit(1);
}

export const env = parsed.data;

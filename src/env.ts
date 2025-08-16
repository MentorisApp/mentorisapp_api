import { z } from "zod";

const schema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	PORT: z.coerce.number().int().positive(),
	DATABASE_URL: z.string(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
	console.error(
		"❌ Invalid environment variables:",
		JSON.stringify(parsed.error, null, 4),
	);
	process.exit(1);
}

export const env = parsed.data;

import z from "zod";

export const createPositiveIntSchema = (name: string) =>
	z.coerce
		.number(`${name} must be a valid number`)
		.int(`${name} must be an integer`)
		.positive(`${name} must be a positive number`);

export const createPositiveIntParamsSchema = (name: string) =>
	z.object({ [name]: createPositiveIntSchema(name) }).strict();

export const UuidSchema = z.uuid("Invalid token format.");

export const EmailSchema = z.email("Email format is invalid.");
export const DictionaryResponseDTO = z.object({
	id: z.number(),
	name: z.string(),
	code: z.string(),
});

export const EmailDtoSchema = z.object({
	email: z.email(),
});

export const PasswordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters long.")
	.regex(
		/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
		"Password must include at least one uppercase letter, one number, one symbol, and contain no spaces.",
	);

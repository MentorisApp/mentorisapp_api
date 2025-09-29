import z from "zod";

// Used for checking numbers in query params
export const NumberSchema = (name: string) => {
	const numberSchema = z.coerce
		.number(`${name} must be a valid number`)
		.int(`${name} must be an integer`)
		.positive(`${name} must be a positive number`);

	return z.object({ [name]: numberSchema }).required();
};

// Used for checking if valid uuids
export const UuidQuerySchema = (name: string) => {
	const uuidSchema = z.uuid(`${name} must be a valid UUID`);

	return z.object({ [name]: uuidSchema }).required();
};

// Generic password schema
export const PasswordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters long.")
	.regex(
		/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
		"Password must include at least one uppercase letter, one number, one symbol, and contain no spaces.",
	);

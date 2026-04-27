import { ZodFastifySchemaValidationError } from "fastify-type-provider-zod";

// errors/mapValidationErrors.ts
export function mapValidationErrors(
	issues: ZodFastifySchemaValidationError[],
): Record<string, string[]> {
	const fieldErrors: Record<string, string[]> = {};

	for (const issue of issues) {
		const field = issue.instancePath.replace(/^\//, "").replace(/\//g, ".") || "root";

		if (!fieldErrors[field]) {
			fieldErrors[field] = [];
		}

		fieldErrors[field].push(issue.message ?? "Invalid value");
	}

	return fieldErrors;
}

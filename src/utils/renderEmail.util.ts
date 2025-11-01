import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";

import { env } from "~/env";
import { EmailTemplateParams } from "~/types/email.types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Renders prebuilt mjml to hbs files
export function renderEmail(template: EmailTemplateParams) {
	const isDev = env.NODE_ENV === "development";

	const templatesDir = isDev
		? path.join(__dirname, "..", "templates/compiled")
		: path.join(__dirname, "..", "dist", "templates");

	const templatePath = path.join(templatesDir, `${template.name}.hbs`);

	if (!fs.existsSync(templatePath)) {
		throw new Error(`Email template not found: ${templatePath}`);
	}

	const templateSource = fs.readFileSync(templatePath, "utf8");

	const compiled = Handlebars.compile(templateSource);
	const html = compiled({ ...template.variables, year: new Date().getFullYear() });

	return html;
}

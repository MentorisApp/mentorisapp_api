import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";

import { EmailTemplateParams } from "~/modules/email/email.types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Renders prebuilt mjml to hbs files
export function renderEmail(template: EmailTemplateParams) {
	console.log("🚀 ~ renderEmail ~ __dirname:", __dirname);
	const templatesDir = path.join(__dirname, "templates");
	const templatePath = path.join(templatesDir, `${template.name}.hbs`);

	if (!fs.existsSync(templatePath)) {
		throw new Error(`Email template not found: ${templatePath}`);
	}

	const templateSource = fs.readFileSync(templatePath, "utf8");

	const compiled = Handlebars.compile(templateSource);
	const html = compiled({ ...template.variables, year: new Date().getFullYear() });

	return html;
}

import fs from "fs";
import mjml2html from "mjml";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, "..", "src", "templates", "emails");
const outDir = process.env.EMAIL_OUTPUT_DIR!;

if (!outDir) {
	throw new Error("EMAIL_OUTPUT_DIR not set in env file!");
}

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir, { recursive: true });
}

// Compile each MJML file
for (const file of fs.readdirSync(srcDir)) {
	if (file.endsWith(".mjml")) {
		const filePath = path.join(srcDir, file);
		const mjmlContent = fs.readFileSync(filePath, "utf-8");

		const { html, errors } = mjml2html(mjmlContent, { filePath });

		if (errors.length) {
			console.warn(`⚠️ MJML errors in ${file}:`, errors);
		}

		const outFile = file.replace(".mjml", ".hbs");
		fs.writeFileSync(path.join(outDir, outFile), html, "utf-8");
	}
}

console.log(`✅ Email templates built into: ${outDir}`);

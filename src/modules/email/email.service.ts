import { Transporter } from "nodemailer";

import { SendEmailParams } from "~/modules/email/email.types";
import { renderEmail } from "~/modules/email/renderEmail.util";

import { emailTemplateConfig } from "./email.config";

export function createEmailService(deps: { transporter: Transporter }) {
	return {
		send: async (options: SendEmailParams) => {
			const { template, to } = options;

			const html = renderEmail(template);
			const config = emailTemplateConfig[template.name];

			return deps.transporter.sendMail({
				to,
				from: {
					name: "Mentoris App",
					address: "noreply@mentorisapp.com",
				},
				subject: config.subject,
				html,
			});
		},
	};
}

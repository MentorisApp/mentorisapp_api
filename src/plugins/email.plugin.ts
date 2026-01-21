import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import nodemailer from "nodemailer";

import { emailTemplateConfig } from "~/config/email.config";
import type { SendEmailParams } from "~/types/email.types";
import { renderEmail } from "~/utils/renderEmail.util";

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: "elfrieda.rau15@ethereal.email",
		pass: "MEkdXG9nWVNddmhbvJ",
	},
});

const emailPluginHandler: FastifyPluginAsync = async (app) => {
	app.decorate("email", {
		send: async (options: SendEmailParams) => {
			const { template, to } = options;

			const html = renderEmail(template);
			const config = emailTemplateConfig[template.name];
			const from = {
				name: "Mentoris App",
				address: "noreply@mentorisapp.com",
			};
			const subject = config.subject;

			const info = await transporter.sendMail({
				from,
				to,
				subject,
				html,
			});

			return info;
		},
	});
};
export const emailPlugin = fp(emailPluginHandler, {
	name: "email-plugin",
});

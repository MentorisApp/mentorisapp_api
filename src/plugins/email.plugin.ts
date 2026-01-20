import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import nodemailer from "nodemailer";

import { emailTemplateConfig } from "~/config/email.config";
import { env } from "~/env";
import type { SendEmailParams } from "~/types/email.types";
import { renderEmail } from "~/utils/renderEmail.util";

const transporter = nodemailer.createTransport({
	host: env.EMAIL_HOST,
	port: 587,
	secure: false,
	auth: {
		user: env.EMAIL_AUTH_USER,
		pass: env.EMAIL_AUTH_PASS,
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

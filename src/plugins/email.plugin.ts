import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import nodemailer from "nodemailer";

import { createEmailService } from "~/modules/email/email.service";

const emailPluginHandler: FastifyPluginAsync = async (app) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: "elfrieda.rau15@ethereal.email",
			pass: "MEkdXG9nWVNddmhbvJ",
		},
	});

	const emailService = createEmailService({ transporter });

	app.decorate("email", emailService);
};

export const emailPlugin = fp(emailPluginHandler, {
	name: "email-plugin",
});

import SMTPTransport from "nodemailer/lib/smtp-transport";

interface TemplateVariables {
	resetPasswordTemplate: {
		link: string;
		username: string;
	};
	verifyAccountTemplate: {
		link: string;
	};
}

export type EmailTemplateParams = {
	[K in keyof TemplateVariables]: {
		name: K;
		variables: TemplateVariables[K];
	};
}[keyof TemplateVariables];

export type SendEmailParams = {
	to: string;
	template: EmailTemplateParams;
};

export interface EmailPlugin {
	send: (options: SendEmailParams) => Promise<SMTPTransport.SentMessageInfo>;
}

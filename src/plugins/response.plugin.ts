import { FastifyPluginAsync, FastifyReply } from "fastify";
import fp from "fastify-plugin";

import { ApiCode } from "~/constants/apiCode.enum";
import { DomainCode } from "~/constants/domainCodes.enum";

export type ApiResponse<T> = {
	data: T | null;
	success: boolean;
	message: string | null;
	code: ApiCode;
	domainCode?: DomainCode | null;
};

const responseHandler: FastifyPluginAsync = async (app) => {
	app.decorateReply(
		"success",
		function <T>(
			this: FastifyReply,
			data?: T,
			options?: {
				message?: string | null;
				code?: ApiCode;
				domainCode?: DomainCode;
			},
		) {
			const response: ApiResponse<T> = {
				success: true,
				data: data ?? null,
				message: options?.message ?? null,
				code: options?.code ?? ApiCode.OK,
				domainCode: options?.domainCode,
			};

			return this.send(response);
		},
	);
};

export const responsePlugin = fp(responseHandler, {
	name: "response-plugin",
});

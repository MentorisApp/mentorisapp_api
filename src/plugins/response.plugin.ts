import { FastifyPluginAsync, FastifyReply } from "fastify";
import fp from "fastify-plugin";

import { ApiCode } from "~/constants/apiCode.enum";
import { DomainCode } from "~/constants/domainCodes.enum";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export type ApiResponse<T = unknown> = {
	data: T | null;
	success: boolean;
	message: string | null;
	code: ApiCode;
	domainCode?: DomainCode | null;
};

export type OkOptions<T> = {
	data: T;
	message?: string | null;
	domainCode?: DomainCode;
};

export type CreatedOptions = {
	id: number;
	message?: string | null;
	domainCode?: DomainCode;
};

export type NoContentOptions = Omit<OkOptions<null>, "data">;

const responseHandler: FastifyPluginAsync = async (app) => {
	app.decorateReply("ok", function <T>(this: FastifyReply, options: OkOptions<T>) {
		const response: ApiResponse<T> = {
			data: options.data,
			code: ApiCode.OK,
			success: true,
			message: options?.message ?? null,
			domainCode: options?.domainCode ?? null,
		};

		return this.status(HttpStatus.OK).send(response);
	});

	app.decorateReply("created", function (this: FastifyReply, options: CreatedOptions) {
		const response: ApiResponse<{ id: number }> = {
			success: true,
			data: { id: options.id },
			message: options.message ?? null,
			code: ApiCode.CREATED,
			domainCode: options.domainCode ?? null,
		};

		return this.status(HttpStatus.CREATED).send(response);
	});

	app.decorateReply("noContent", function (this: FastifyReply, options?: NoContentOptions) {
		const response: ApiResponse<null> = {
			success: true,
			data: null,
			message: options?.message ?? null,
			code: ApiCode.NO_CONTENT,
			domainCode: options?.domainCode ?? null,
		};

		return this.status(HttpStatus.NO_CONTENT).send(response);
	});
};

export const responsePlugin = fp(responseHandler, {
	name: "response-plugin",
});

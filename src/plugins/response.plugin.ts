import { FastifyPluginAsync, FastifyReply } from "fastify";
import fp from "fastify-plugin";

import { HttpStatus } from "~/enums/httpStatus.enum";

const responseHandler: FastifyPluginAsync = async (app) => {
	app.decorateReply(
		"success",
		function <TData = unknown, TMeta = unknown>(
			this: FastifyReply,
			options: {
				data?: TData;
				meta?: TMeta;
			} = {},
		) {
			const hasData = options.data !== undefined && options.data !== null;

			// 204 No Content
			if (!hasData) {
				this.code(HttpStatus.NO_CONTENT);
				return this.send();
			}

			// 200 OK
			return this.status(HttpStatus.OK).send({
				data: options.data,
				meta: options.meta,
			});
		},
	);
};

export const responsePlugin = fp(responseHandler, {
	name: "response-plugin",
});

import { FastifyPluginAsync, FastifyReply } from "fastify";
import fp from "fastify-plugin";

import { HttpStatus } from "~/enums/httpStatus.enum";

const responseHandler: FastifyPluginAsync = async (app) => {
	app.decorateReply(
		"ok",
		function <TData = unknown, TMeta = unknown>(
			this: FastifyReply,
			options: {
				data: TData;
				meta?: TMeta;
			},
		) {
			// 200 OK
			return this.code(HttpStatus.OK).send({
				data: options.data,
				meta: options.meta,
			});
		},
	);

	app.decorateReply("created", function <
		TData = unknown,
	>(this: FastifyReply, options: { data: TData }) {
		return this.code(HttpStatus.CREATED).send({
			data: options.data,
		});
	});

	app.decorateReply("noContent", function (this: FastifyReply) {
		// 200 OK
		return this.code(HttpStatus.NO_CONTENT).send();
	});
};

export const responsePlugin = fp(responseHandler, {
	name: "response-plugin",
});

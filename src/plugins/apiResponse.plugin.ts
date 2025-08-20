import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export const apiResponseOnSend: FastifyPluginAsync = async (app) => {
	app.addHook("onSend", async (_request, _reply, payload) => {
		const data = typeof payload === "string" ? JSON.parse(payload) : payload;

		if (
			data &&
			typeof data === "object" &&
			"data" in data &&
			"messages" in data
		) {
			return payload;
		}

		const wrapped = {
			data,
			messages: [],
		};

		return JSON.stringify(wrapped);
	});
};

export const apiResponseWrapper = fp(apiResponseOnSend, {
	name: "api-response-wrapper",
});

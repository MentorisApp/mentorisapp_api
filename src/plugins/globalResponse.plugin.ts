import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const globalResponseHandler: FastifyPluginAsync = async (app) => {
	// Normalize undefined -> null before serialization
	app.addHook("preSerialization", async (_request, _reply, payload) => {
		return payload ?? null;
	});

	// Wrap the response
	app.addHook("onSend", async (_request, _reply, payload) => {
		const data = typeof payload === "string" ? JSON.parse(payload) : payload;

		// Already wrapped? return as-is
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
			// TODO Handle messages for successfull responses, but granular, for each controller its own messages
		};

		return JSON.stringify(wrapped);
	});
};

export const globalResponsePlugin = fp(globalResponseHandler, {
	name: "global-response-plugin",
});

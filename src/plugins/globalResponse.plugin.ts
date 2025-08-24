import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { SuccessResponse } from "~/domain/dto/SuccessResponse.dto";

const globalResponseHandler: FastifyPluginAsync = async (app) => {
	app.addHook("preSerialization", async (_request, _reply, payload) => {
		// normalize undefined → null
		const normalized = payload ?? null;

		// Check if already sending error from setErrorHandler plugin
		if (
			normalized &&
			typeof normalized === "object" &&
			"success" in normalized &&
			normalized.success === false
		) {
			return payload;
		}

		return new SuccessResponse(normalized);
	});
};

export const globalResponsePlugin = fp(globalResponseHandler, {
	name: "global-response-plugin",
});

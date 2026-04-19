import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { jsonSchemaTransform, jsonSchemaTransformObject } from "fastify-type-provider-zod";

const swaggerConfig: FastifyPluginAsync = async (app) => {
	// 1. Register OpenAPI
	await app.register(swagger, {
		openapi: {
			info: {
				title: "Mentoris API",
				version: "1.0.0",
			},
		},
		transform: jsonSchemaTransform,
		transformObject: jsonSchemaTransformObject,
	});

	// 2. Register Swagger UI
	await app.register(swaggerUi, {
		routePrefix: "/docs",
		// exposeRoute: true,
		transformSpecificationClone: true,

		uiConfig: {
			docExpansion: "list",
		},
	});
};

export const swaggerPlugin = fp(swaggerConfig, {
	name: "swagger-plugin",
	encapsulate: false,
});

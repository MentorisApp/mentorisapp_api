import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { jsonSchemaTransform, jsonSchemaTransformObject } from "fastify-type-provider-zod";

import pkg from "../../package.json";

const swaggerConfig: FastifyPluginAsync = async (app) => {
	// 1. Register OpenAPI
	await app.register(swagger, {
		transform: jsonSchemaTransform,
		transformObject: jsonSchemaTransformObject,
		openapi: {
			info: {
				title: "Mentoris API",
				version: pkg.version,
			},
		},
	});

	// 2. Register Swagger UI
	await app.register(swaggerUi, {
		routePrefix: "/docs",
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

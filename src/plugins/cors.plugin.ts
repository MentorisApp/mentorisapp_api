import cors from "@fastify/cors";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const corsHandler: FastifyPluginAsync = async (app) => {
	await app.register(cors, {
		origin: "http://localhost:4321",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	});
};

export const corsPlugin = fp(corsHandler, {
	name: "cors-plugin",
});

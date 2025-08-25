import "@fastify/jwt";
import "fastify";

import { AppDb } from "./db.type";
import { JwtPayload } from "./jwt.type";

export interface AuthOptions {
	all?: number[];
	any?: number[];
}

declare module "fastify" {
	interface FastifyInstance {
		db: AppDb;
		authorizeAccess: (
			opts?: AuthOptions,
		) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}
}

declare module "@fastify/jwt" {
	interface FastifyJWT {
		payload: JwtPayload;
	}
}

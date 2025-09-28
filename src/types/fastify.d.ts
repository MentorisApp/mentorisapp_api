import "@fastify/jwt";
import "fastify";

import { AppDb } from "./db.types";
import { EmailPlugin } from "./email.types";
import { JwtPayload } from "./jwt.types";

export interface AuthOptions {
	all?: number[];
	any?: number[];
}

declare module "fastify" {
	interface FastifyInstance {
		db: AppDb;
		email: EmailPlugin;
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

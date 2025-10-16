import "@fastify/jwt";
import "fastify";

import { Permission } from "~/constants/permissions";
import { AppDb } from "./db.types";
import { EmailPlugin } from "./email.types";
import { JwtPayload } from "./jwt.types";

declare module "fastify" {
	interface FastifyInstance {
		db: AppDb;
		email: EmailPlugin;
		authorize: (
			requiredPermissions: Permission[] = [],
		) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}
}

declare module "@fastify/jwt" {
	interface FastifyJWT {
		payload: JwtPayload;
	}
}

import { AppDb } from "@plugins/db";
import "fastify";

declare module "fastify" {
	interface FastifyInstance {
		db: AppDb;
	}
}

import "fastify";
import { AppDb } from "./db.type";

declare module "fastify" {
	interface FastifyInstance {
		db: AppDb;
	}
}

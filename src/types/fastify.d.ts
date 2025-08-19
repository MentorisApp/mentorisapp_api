import "fastify";
import { AppDb } from "./db.types";

declare module "fastify" {
	interface FastifyInstance {
		db: AppDb;
	}
}

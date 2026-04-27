import { drizzle } from "drizzle-orm/node-postgres";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Pool } from "pg";

import * as schema from "~/db/schema";
import { env } from "~/env";

// TODO remove schemas from db plugin
const databaseClient = async (fastify: FastifyInstance) => {
	// Create pool
	const pool = new Pool({ connectionString: env.DATABASE_URL });

	// Create db client
	const dbRaw = drizzle(pool, { schema });

	// Attach drizzle database client to Fastify
	fastify.decorate("db", dbRaw);

	// Cleanup when server closes
	fastify.addHook("onClose", async () => {
		await pool.end();
	});
};

export const dbClientPlugin = fp(databaseClient, { name: "db-client-plugin" });

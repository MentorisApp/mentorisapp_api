// plugins/db.ts
import { env } from "@env";
import * as schema from "@schema/index";
import { drizzle } from "drizzle-orm/node-postgres";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Pool } from "pg";
import { AppDb } from "../types/db.type";

const dbPlugin = async (fastify: FastifyInstance) => {
	// Create a Pool from connection string
	const pool = new Pool({ connectionString: env.DATABASE_URL });

	// Create db raw
	const dbRaw = drizzle(pool, { schema });

	// Merge schema tables at runtime and tell TS to trust
	const dbMerged = Object.assign(dbRaw, schema) as unknown as AppDb;

	// Attach drizzle database to Fastify
	fastify.decorate("db", dbMerged);

	// Cleanup when server closes
	fastify.addHook("onClose", async () => {
		await pool.end();
	});
};

export const db = fp(dbPlugin, { name: "db-plugin" });

// import { env } from "@env";
import { defineConfig } from "drizzle-kit";


// const url = env.DATABASE_URL

export default defineConfig({
	// TODO wont generate all migration files
	schema: ["./src/db/schema/**/*/*.schema.ts","./src/db/schema/joins/**/*/*.schema.ts"],
	out: "./src/db/migrations",
	dialect: "postgresql",
	// dbCredentials: {
	// 	url: url,
	// },
});


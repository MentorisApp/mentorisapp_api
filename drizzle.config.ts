// import { env } from "@env";
import { defineConfig } from "drizzle-kit";



export default defineConfig({
	schema: "./src/db/schema/**/*.schema.ts",
	out: "./src/db/migrations",
	dialect: "postgresql",
	// dbCredentials: {
	// 	url: url,
	// },
});


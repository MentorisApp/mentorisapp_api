import cookie from "@fastify/cookie";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { env } from "~/env";

const cookieHandler: FastifyPluginAsync = async (app) => {
	app.register(cookie, {
		secret: env.COOKIE_SECRET,
		parseOptions: {
			signed: true,
			httpOnly: true, // cannot be accessed via JS
			secure: env.NODE_ENV === "production", // only over HTTPS in prod
			sameSite: "lax", // CSRF protection
			path: "/", // cookie available on all routes
		},
	});
};

export const cookiePlugin = fp(cookieHandler, { name: "cookie-plugin" });

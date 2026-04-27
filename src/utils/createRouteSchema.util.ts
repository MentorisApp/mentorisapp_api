import { FastifySchema } from "fastify";

export const createRouteSchema = <T extends FastifySchema>(options: T): T => {
	return options;
};

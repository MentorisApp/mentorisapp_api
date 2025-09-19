import { FastifyRequest } from "fastify";
import z from "zod";

export const UserIdSchema = z.coerce
	.number("userId in token payload must be a valid number")
	.int("userId in token payload must be an integer")
	.positive("userId in token payload must be a positive number");

export const getUserIdFromToken = (request: FastifyRequest): number => {
	const sub = request.user?.sub;

	const result = UserIdSchema.parse(sub);

	return result;
};

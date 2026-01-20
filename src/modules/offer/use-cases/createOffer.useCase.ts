import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { getUserIdFromToken } from "~/utils/auth.util";

import { OfferUserCreateSchema } from "../offer.validator";

export async function createOfferUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = getUserIdFromToken(request);
	const body = OfferUserCreateSchema.parse(request.body);
	const newOffer = await this.offerService.createOffer(body, userId);
	reply.status(HttpStatus.CREATED).send(newOffer);
}

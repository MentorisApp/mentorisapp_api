import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { getUserIdFromToken } from "~/utils/auth.util";

import { OfferUserUpdateSchema } from "../offer.validator";

export async function updateOfferUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const userId = getUserIdFromToken(request);
	const body = OfferUserUpdateSchema.parse(request.body);
	const updatedOffer = await this.offerService.updateOffer(body, userId);
	reply.status(HttpStatus.OK).send(updatedOffer);
}

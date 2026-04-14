import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

import type { GetOfferByIdParams } from "./getOfferById.schema";

type GetOfferByIdHandlerRequest = FastifyRequest<{
	Params: GetOfferByIdParams;
}>;

export async function getOfferByIdHandler(
	this: FastifyInstance,
	request: GetOfferByIdHandlerRequest,
	reply: FastifyReply,
) {
	const offer = await this.offerService.getOfferByOfferId(request.params.offerId);

	reply.status(HttpStatus.OK).send(offer);
}

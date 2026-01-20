import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { NumberSchema } from "~/utils/zod-shared.validator";

export async function getOfferByOfferIdUseCase(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { offerId } = NumberSchema("offerId").parse(request.params);
	const offer = await this.offerService.getOfferByOfferId(offerId);
	reply.status(HttpStatus.OK).send(offer);
}

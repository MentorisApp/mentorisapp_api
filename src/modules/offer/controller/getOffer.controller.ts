import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";

export async function getOfferHandler(
	this: FastifyInstance,
	request: FastifyRequest,
	reply: FastifyReply,
) {
	if (!request.userId) {
		throw new ForbiddenError("Missing authenticated user context");
	}

	const offer = await this.offerService.getOfferByUserId(request.userId);

	reply.status(HttpStatus.OK).send(offer);
}

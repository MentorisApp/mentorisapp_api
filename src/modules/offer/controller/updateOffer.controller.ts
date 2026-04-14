import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";

import type { UpdateOfferRequest } from "./updateOffer.schema";

type UpdateOfferHandlerRequest = FastifyRequest<{
	Body: UpdateOfferRequest;
}>;

export async function updateOfferHandler(
	this: FastifyInstance,
	request: UpdateOfferHandlerRequest,
	reply: FastifyReply,
) {
	if (!request.userId) {
		throw new ForbiddenError("Missing authenticated user context");
	}

	const offer = await this.offerService.updateOffer(request.body, request.userId);

	reply.status(HttpStatus.OK).send(offer);
}

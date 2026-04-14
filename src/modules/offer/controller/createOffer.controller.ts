import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";

import type { CreateOfferRequest } from "./createOffer.schema";

type CreateOfferHandlerRequest = FastifyRequest<{
	Body: CreateOfferRequest;
}>;

export async function createOfferHandler(
	this: FastifyInstance,
	request: CreateOfferHandlerRequest,
	reply: FastifyReply,
) {
	if (!request.userId) {
		throw new ForbiddenError("Missing authenticated user context");
	}

	const offer = await this.offerService.createOffer(request.body, request.userId);

	reply.status(HttpStatus.CREATED).send(offer);
}

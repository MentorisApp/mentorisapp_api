import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";

import type { CreateOfferRequest } from "./schemas/createOffer.schema";
import type { GetOfferByIdParams } from "./schemas/getOfferById.schema";
import type { UpdateOfferRequest } from "./schemas/updateOffer.schema";

type CreateOfferHandlerRequest = FastifyRequest<{
	Body: CreateOfferRequest;
}>;

type UpdateOfferHandlerRequest = FastifyRequest<{
	Body: UpdateOfferRequest;
}>;

type GetOfferByIdHandlerRequest = FastifyRequest<{
	Params: GetOfferByIdParams;
}>;

export function createOfferController(app: FastifyInstance) {
	return {
		async createOffer(request: CreateOfferHandlerRequest, reply: FastifyReply) {
			if (!request.userId) {
				throw new ForbiddenError("Missing authenticated user context");
			}

			const offer = await app.offerService.createOffer(request.body, request.userId);

			reply.status(HttpStatus.CREATED).send(offer);
		},

		async updateOffer(request: UpdateOfferHandlerRequest, reply: FastifyReply) {
			if (!request.userId) {
				throw new ForbiddenError("Missing authenticated user context");
			}

			const offer = await app.offerService.updateOffer(request.body, request.userId);

			reply.status(HttpStatus.OK).send(offer);
		},

		async getOffer(request: FastifyRequest, reply: FastifyReply) {
			if (!request.userId) {
				throw new ForbiddenError("Missing authenticated user context");
			}

			const offer = await app.offerService.getOfferByUserId(request.userId);

			reply.status(HttpStatus.OK).send(offer);
		},

		async getOfferById(request: GetOfferByIdHandlerRequest, reply: FastifyReply) {
			const offer = await app.offerService.getOfferByOfferId(request.params.offerId);

			reply.status(HttpStatus.OK).send(offer);
		},
	};
}

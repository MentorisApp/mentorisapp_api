import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { ForbiddenError } from "~/errors/generic/ForbiddenError";

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
		async createOffer(req: CreateOfferHandlerRequest, res: FastifyReply) {
			if (!req.userId) throw new ForbiddenError("Missing authenticated user context");
			const offer = await app.offerService.createOffer(req.body, req.userId);
			res.status(HttpStatus.CREATED).send(offer);
		},

		async updateOffer(req: UpdateOfferHandlerRequest, res: FastifyReply) {
			if (!req.userId) throw new ForbiddenError("Missing authenticated user context");
			const offer = await app.offerService.updateOffer(req.body, req.userId);
			res.status(HttpStatus.OK).send(offer);
		},

		async getOffer(req: FastifyRequest, res: FastifyReply) {
			if (!req.userId) throw new ForbiddenError("Missing authenticated user context");
			const offer = await app.offerService.getOfferByUserId(req.userId);
			res.status(HttpStatus.OK).send(offer);
		},

		async getOfferById(req: GetOfferByIdHandlerRequest, res: FastifyReply) {
			const offer = await app.offerService.getOfferByOfferId(req.params.offerId);
			res.status(HttpStatus.OK).send(offer);
		},
	};
}

// offer/
//   domain/
//     offer.types.ts              ← business model

//   application/
//     offer.service.ts            ← business logic

//   api/
//     offer.schemas.ts           ← Zod API contract
//     offer.types.ts             ← optional inferred API types

//   mappers/
//     offer.mapper.ts            ← domain → API

//   presentation/
//     offer.controller.ts        ← HTTP layer
//     offer.routes.ts

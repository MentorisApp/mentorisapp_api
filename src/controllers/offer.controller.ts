import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { createOfferService } from "~/services/offer.service";
import { createReviewService } from "~/services/review.service";
import { getUserIdFromToken } from "~/utils/auth.util";
import { OfferUserCreateSchema, OfferUserUpdateSchema } from "~/validators/offer.validator";
import { NumberSchema } from "~/validators/zod-shared.validator";

export const offerController = (app: FastifyInstance) => {
	const offerService = createOfferService(app);
	const reviewService = createReviewService(app);

	return {
		getOfferByUserId: async (request: FastifyRequest, reply: FastifyReply) => {
			const userId = getUserIdFromToken(request);
			const offer = await offerService.getOfferByUserId(userId);
			reply.status(HttpStatus.OK).send(offer);
		},
		getOfferByOfferId: async (request: FastifyRequest, reply: FastifyReply) => {
			const { offerId } = NumberSchema("offerId").parse(request.params);
			const offer = await offerService.getOfferByOfferId(offerId);
			reply.status(HttpStatus.OK).send(offer);
		},
		create: async (request: FastifyRequest, reply: FastifyReply) => {
			const userId = getUserIdFromToken(request);
			const body = OfferUserCreateSchema.parse(request.body);
			const newOffer = await offerService.createOffer(body, userId);
			reply.status(HttpStatus.CREATED).send(newOffer);
		},
		update: async (request: FastifyRequest, reply: FastifyReply) => {
			const userId = getUserIdFromToken(request);
			const body = OfferUserUpdateSchema.parse(request.body);
			const updatedOffer = await offerService.updateOffer(body, userId);
			reply.status(HttpStatus.OK).send(updatedOffer);
		},
		getAllActiveReviews: async (request: FastifyRequest, reply: FastifyReply) => {
			const { offerId } = NumberSchema("offerId").parse(request.params);
			const reviews = await reviewService.getAllActiveOfferReviews(offerId);
			reply.status(HttpStatus.OK).send(reviews);
		},

		// reject: async (request: FastifyRequest, reply: FastifyReply) => {},
		// markAsPaid: async (request: FastifyRequest, reply: FastifyReply) => {},
		// approveAndActivate: async (request: FastifyRequest, reply: FastifyReply) => {},
		// deactivate: async (request: FastifyRequest, reply: FastifyReply) => {},
	};
};

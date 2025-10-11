import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { createOfferService } from "~/services/offer.service";
import { getUserIdFromToken } from "~/utils/auth.util";
import { OfferUserCreateSchema, OfferUserUpdateSchema } from "~/validators/offer.validator";

export const offerController = (app: FastifyInstance) => {
	const offerService = createOfferService(app);

	return {
		getOne: async (request: FastifyRequest, reply: FastifyReply) => {
			const userId = getUserIdFromToken(request);
			const offer = await offerService.getOfferByUserId(userId);

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

		// reject: async (request: FastifyRequest, reply: FastifyReply) => {},
		// markAsPaid: async (request: FastifyRequest, reply: FastifyReply) => {},
		// approveAndActivate: async (request: FastifyRequest, reply: FastifyReply) => {},
		// deactivate: async (request: FastifyRequest, reply: FastifyReply) => {},
	};
};

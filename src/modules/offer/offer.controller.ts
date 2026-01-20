import { createOfferUseCase } from "./use-cases/createOffer.useCase";
import { getOfferByOfferIdUseCase } from "./use-cases/getOfferByOfferId.useCase";
import { getOfferByUserIdUseCase } from "./use-cases/getOfferByUserId.useCase";
import { updateOfferUseCase } from "./use-cases/updateOffer.useCase";

export const offerController = () => {
	return {
		getOfferByUserId: getOfferByUserIdUseCase,
		getOfferByOfferId: getOfferByOfferIdUseCase,
		createOffer: createOfferUseCase,
		updateOffer: updateOfferUseCase,

		// reject: async (request: FastifyRequest, reply: FastifyReply) => {},
		// markAsPaid: async (request: FastifyRequest, reply: FastifyReply) => {},
		// approveAndActivate: async (request: FastifyRequest, reply: FastifyReply) => {},
		// deactivate: async (request: FastifyRequest, reply: FastifyReply) => {},
	};
};

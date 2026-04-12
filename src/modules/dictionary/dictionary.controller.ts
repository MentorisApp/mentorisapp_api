import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export const dictionaryController = () => {
	return {
		getAllCities: async function (
			this: FastifyInstance,
			_request: FastifyRequest,
			reply: FastifyReply,
		) {
			const cities = await this.dictionaryService.getCitiesDictionary();
			reply.status(HttpStatus.OK).send(cities);
		},

		getAllCategories: async function (
			this: FastifyInstance,
			_request: FastifyRequest,
			reply: FastifyReply,
		) {
			const categories = await this.dictionaryService.getCategoriesDictionary();
			reply.status(HttpStatus.OK).send(categories);
		},
	};
};

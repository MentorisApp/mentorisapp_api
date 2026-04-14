import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export function createDictionaryController(app: FastifyInstance) {
	return {
		async getCities(_request: FastifyRequest, reply: FastifyReply) {
			const cities = await app.dictionaryService.getCitiesDictionary();

			reply.status(HttpStatus.OK).send(cities);
		},

		async getCategories(_request: FastifyRequest, reply: FastifyReply) {
			const categories = await app.dictionaryService.getCategoriesDictionary();

			reply.status(HttpStatus.OK).send(categories);
		},
	};
}

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export async function getCategoriesHandler(
	this: FastifyInstance,
	_request: FastifyRequest,
	reply: FastifyReply,
) {
	const categories = await this.dictionaryService.getCategoriesDictionary();

	reply.status(HttpStatus.OK).send(categories);
}

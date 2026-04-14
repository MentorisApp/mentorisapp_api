import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export async function getCitiesHandler(
	this: FastifyInstance,
	_request: FastifyRequest,
	reply: FastifyReply,
) {
	const cities = await this.dictionaryService.getCitiesDictionary();

	reply.status(HttpStatus.OK).send(cities);
}

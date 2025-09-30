import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "~/constants/httpStatusCodes.enum";
import { createDictionaryService } from "~/services/dictionary.service";

export const useDictionaryController = (app: FastifyInstance) => {
	const dictionaryService = createDictionaryService(app);

	return {
		getAllCountries: async (_request: FastifyRequest, reply: FastifyReply) => {
			const countries = await dictionaryService.getCountriesDictionary();

			reply.status(HttpStatus.OK);
			reply.send(countries);
		},

		getAllCities: async (_request: FastifyRequest, reply: FastifyReply) => {
			const cities = await dictionaryService.getCitiesDictionary();

			reply.status(HttpStatus.OK);
			reply.send(cities);
		},

		getAllGenders: async (_request: FastifyRequest, reply: FastifyReply) => {
			const genders = await dictionaryService.getGendersDictionary();

			reply.status(HttpStatus.OK);
			reply.send(genders);
		},

		getAllEducationLevels: async (_request: FastifyRequest, reply: FastifyReply) => {
			const educationLevels = await dictionaryService.getEducationLevelsDictionary();

			reply.status(HttpStatus.OK);
			reply.send(educationLevels);
		},
	};
};

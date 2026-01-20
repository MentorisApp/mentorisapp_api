import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpStatus } from "~/constants/httpStatusCodes.enum";

export const dictionaryController = () => {
	return {
		getAllCountries: async function (
			this: FastifyInstance,
			_request: FastifyRequest,
			reply: FastifyReply,
		) {
			const countries = await this.dictionaryService.getCountriesDictionary();
			reply.status(HttpStatus.OK).send(countries);
		},

		getAllCities: async function (
			this: FastifyInstance,
			_request: FastifyRequest,
			reply: FastifyReply,
		) {
			const cities = await this.dictionaryService.getCitiesDictionary();
			reply.status(HttpStatus.OK).send(cities);
		},

		getAllGenders: async function (
			this: FastifyInstance,
			_request: FastifyRequest,
			reply: FastifyReply,
		) {
			const genders = await this.dictionaryService.getGendersDictionary();
			reply.status(HttpStatus.OK).send(genders);
		},

		getAllEducationLevels: async function (
			this: FastifyInstance,
			_request: FastifyRequest,
			reply: FastifyReply,
		) {
			const educationLevels = await this.dictionaryService.getEducationLevelsDictionary();
			reply.status(HttpStatus.OK).send(educationLevels);
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

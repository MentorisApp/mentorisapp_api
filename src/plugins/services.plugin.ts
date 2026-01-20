import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { createAuthService } from "~/modules/auth/auth.services";
import { createDictionaryService } from "~/modules/dictionary/dictionary.services";
import { createOfferService } from "~/modules/offer/offer.services";
import { createProfileService } from "~/modules/profile/profile.services";
import { createReviewService } from "~/modules/review/review.services";
import { createTokenService } from "~/modules/token/token.services";
import { createVerificationTokensService } from "~/modules/token/verificationToken.services";
import { createUserService } from "~/modules/user/user.services";

export const servicesPlugin = fp(
	async (app: FastifyInstance) => {
		app.decorate("authService", createAuthService(app));
		app.decorate("offerService", createOfferService(app));
		app.decorate("reviewService", createReviewService(app));
		app.decorate("dictionaryService", createDictionaryService(app));
		app.decorate("tokenService", createTokenService(app));
		app.decorate("verificationTokenService", createVerificationTokensService(app));
		app.decorate("profileService", createProfileService(app));
		app.decorate("userService", createUserService(app));
	},
	{
		name: "services-plugin",
		dependencies: ["db-client-plugin"],
	},
);

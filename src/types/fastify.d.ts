import "@fastify/jwt";
import "fastify";

import { Role } from "~/constants/roles";
import { createAuthService } from "~/modules/auth/auth.services";
import { createDictionaryService } from "~/modules/dictionary/dictionary.services";
import { createOfferService } from "~/modules/offer/offer.services";
import { createProfileService } from "~/modules/profile/profile.services";
import { createReviewService } from "~/modules/review/review.services";
import { createTokenService } from "~/modules/token/token.services";
import { createVerificationTokensService } from "~/modules/token/verificationToken.services";
import { createUserService } from "~/modules/user/user.services";
import { CreatedOptions, NoContentOptions, OkOptions } from "~/plugins/response.plugin";

import { AppDb } from "./db.types";
import { EmailPlugin } from "./email.types";
import { JwtPayload } from "./jwt.types";

declare module "fastify" {
	interface FastifyInstance {
		db: AppDb;
		email: EmailPlugin;
		authService: ReturnType<typeof createAuthService>;
		offerService: ReturnType<typeof createOfferService>;
		reviewService: ReturnType<typeof createReviewService>;
		dictionaryService: ReturnType<typeof createDictionaryService>;
		tokenService: ReturnType<typeof createTokenService>;
		verificationTokenService: ReturnType<typeof createVerificationTokensService>;
		profileService: ReturnType<typeof createProfileService>;
		userService: ReturnType<typeof createUserService>;
		authorize: (role: Role) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}

	interface FastifyRequest {
		userId: number;
	}
	interface FastifyReply {
		ok<T>(options: OkOptions<T>): FastifyReply;
		created(options: CreatedOptions): FastifyReply;
		noContent(options?: NoContentOptions): FastifyReply;
	}
}

declare module "@fastify/jwt" {
	interface FastifyJWT {
		payload: JwtPayload;
	}
}

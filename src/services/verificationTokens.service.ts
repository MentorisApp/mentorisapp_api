import { and, eq, gt, sql } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { VerificationTokenContext } from "~/db/schema/enums/db.enum.schema";
import { TooManyRequestsError } from "~/domain/errors/TooManyRequestsError";
import { minutesFromNow } from "~/utils/datetime.util";
import { hashUtil } from "~/utils/hash.util";
import { generateUuid } from "~/utils/uuid.util";

export function createVerificationTokensService(app: FastifyInstance) {
	const { db } = app;
	const { verification_tokens } = db;

	async function createVerificationToken(userId: number, context: VerificationTokenContext) {
		const MAX_TOKENS_PER_HOUR = 3;

		// TODO Use redis in production
		const [{ count: tokensCreatedCount }] = await db
			.select({ count: sql<number>`COUNT(*)` })
			.from(verification_tokens)
			.where(
				and(
					eq(verification_tokens.userId, userId),
					eq(verification_tokens.context, context),
					gt(verification_tokens.createdAt, sql`NOW() - INTERVAL '1 hour'`),
				),
			);

		if (Number(tokensCreatedCount) >= MAX_TOKENS_PER_HOUR) {
			throw new TooManyRequestsError("Too many attempts. Please try again later.");
		}

		const token = generateUuid();
		const hashedToken = hashUtil.token.hash(token);
		const expiresAt = minutesFromNow(30);

		await db.insert(verification_tokens).values({
			userId,
			context,
			token: hashedToken,
			expiresAt,
		});

		return token; // Return pure uuid, check against hashed when validating
	}

	async function markTokenUsed(token: string) {
		await db
			.update(verification_tokens)
			.set({
				used: true,
				updatedAt: new Date(),
			})
			.where(eq(verification_tokens.token, token));
	}

	return {
		createVerificationToken,
		markTokenUsed,
	};
}

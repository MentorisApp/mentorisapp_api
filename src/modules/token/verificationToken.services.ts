import { and, eq, gt, sql } from "drizzle-orm";

import { type VerificationTokenContext, verificationTokens } from "~/db/schema";
import { TooManyRequestsError } from "~/shared/errors/domain/TooManyRequestsError";
import { App } from "~/types/app.types";
import { minutesFromNow } from "~/utils/datetime.util";
import { hashUtil } from "~/utils/hash.util";
import { generateUuid } from "~/utils/uuid.util";

export function createVerificationTokensService(app: App) {
	const { db } = app;

	async function createVerificationToken(userId: number, context: VerificationTokenContext) {
		const MAX_TOKENS_PER_HOUR = 3;

		// TODO Use redis in production
		const [{ count: tokensCreatedCount }] = await db
			.select({ count: sql<number>`COUNT(*)` })
			.from(verificationTokens)
			.where(
				and(
					eq(verificationTokens.user_id, userId),
					eq(verificationTokens.context, context),
					gt(verificationTokens.created_at, sql`NOW() - INTERVAL '1 hour'`),
				),
			);

		if (Number(tokensCreatedCount) >= MAX_TOKENS_PER_HOUR) {
			throw new TooManyRequestsError("Too many attempts. Please try again later.");
		}

		const token = generateUuid();
		const hashedToken = hashUtil.token.hash(token);
		const expiresAt = minutesFromNow(30);

		await db.insert(verificationTokens).values({
			user_id: userId,
			context,
			token: hashedToken,
			expires_at: expiresAt,
		});

		return token; // Return pure uuid, check against hashed when validating
	}

	async function markTokenUsed(token: string) {
		await db
			.update(verificationTokens)
			.set({
				used: true,
				updated_at: new Date(),
			})
			.where(eq(verificationTokens.token, token));
	}

	return {
		createVerificationToken,
		markTokenUsed,
	};
}

import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { VerificationTokenContext } from "~/db/schema/enums/db.enum.schema";
import { minutesFromNow } from "~/utils/datetime.util";
import { generateUuid } from "~/utils/uuid.util";

export function createVerificationTokensService(app: FastifyInstance) {
	const { db } = app;
	const { verification_tokens } = db;

	const createVerificationToken = async (userId: number, context: VerificationTokenContext) => {
		const token = generateUuid();
		const expiresAt = minutesFromNow(60);

		await db.insert(verification_tokens).values({
			userId,
			context,
			token,
			expiresAt,
		});

		return token;
	};

	const markTokenUsed = async (token: string) => {
		await db
			.update(verification_tokens)
			.set({
				used: true,
			})
			.where(eq(verification_tokens.token, token));
	};

	return {
		createVerificationToken,
		markTokenUsed,
	};
}

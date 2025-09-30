import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { env } from "~/env";
import { parseDurationMs } from "~/utils/datetime.util";
import { unwrapResult } from "~/utils/db.util";
import { generateUuid } from "~/utils/uuid.util";

export function createTokenService(app: FastifyInstance) {
	const { db } = app;
	const { refresh_tokens } = db;

	function generateJti() {
		return generateUuid();
	}

	function issueAccessToken(userId: number, roleId: number, permissionIds: number[]) {
		const expiresIn = env.JWT_ACCESS_TOKEN_EXPIRES_IN;

		return app.jwt.sign({ roleId, permissionIds, sub: userId.toString() }, { expiresIn });
	}

	async function issueRefreshToken(userId: number, jti: string) {
		const expiresInMs = parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN);
		const expiresAt = new Date(Date.now() + expiresInMs);

		const refreshToken = app.jwt.sign(
			{ jti: jti },
			{ expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN },
		);

		await db.insert(refresh_tokens).values({
			jti: jti,
			userId: userId,
			expiresAt,
		});

		return refreshToken;
	}

	async function revokeRefreshToken(refreshToken: string) {
		const { jti } = await verifyRefreshToken(refreshToken);
		await db.update(refresh_tokens).set({ revoked: true }).where(eq(refresh_tokens.jti, jti));
	}

	function verifyRefreshToken(token: string) {
		return app.jwt.verify<{ jti: string }>(token);
	}

	async function getRefreshTokenByJti(jti: string) {
		const refreshToken = await db
			.select()
			.from(refresh_tokens)
			.where(eq(refresh_tokens.jti, jti))
			.limit(1);

		return unwrapResult(refreshToken, "Refresh token not found");
	}

	return {
		revokeRefreshToken,
		issueRefreshToken,
		issueAccessToken,
		verifyRefreshToken,
		getRefreshTokenByJti,
		generateJti,
	};
}

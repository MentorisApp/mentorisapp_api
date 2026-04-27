import { eq } from "drizzle-orm";

import { env } from "~/env";
import { App } from "~/types/app.types";
import { parseDurationMs } from "~/utils/datetime.util";
import { unwrapResult } from "~/utils/db.util";
import { generateUuid } from "~/utils/uuid.util";

import { Role } from "../auth/auth.constants";

export function createTokenService(app: App) {
	const { db } = app;
	const { refreshTokens } = db;

	function generateJti() {
		return generateUuid();
	}

	function issueAccessToken(userId: number, role: Role) {
		const expiresIn = env.JWT_ACCESS_TOKEN_EXPIRES_IN;

		return app.jwt.sign({ role, sub: userId.toString() }, { expiresIn });
	}

	async function issueRefreshToken(userId: number, jti: string) {
		const expiresInMs = parseDurationMs(env.JWT_REFRESH_TOKEN_EXPIRES_IN);
		const expiresAt = new Date(Date.now() + expiresInMs);

		const refreshToken = app.jwt.sign(
			{ jti: jti },
			{ expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN },
		);

		await db.insert(refreshTokens).values({
			jti: jti,
			user_id: userId,
			expires_at: expiresAt,
		});

		return refreshToken;
	}

	async function revokeRefreshToken(refreshToken: string) {
		const { jti } = verifyRefreshToken(refreshToken);

		await db
			.update(refreshTokens)
			.set({ revoked: true, updated_at: new Date() })
			.where(eq(refreshTokens.jti, jti))
			.returning();
	}

	function verifyRefreshToken(token: string) {
		return app.jwt.verify<{ jti: string }>(token);
	}

	async function getRefreshTokenByJti(jti: string) {
		const refreshToken = await db
			.select()
			.from(refreshTokens)
			.where(eq(refreshTokens.jti, jti))
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

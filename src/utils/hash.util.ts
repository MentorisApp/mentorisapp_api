import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 12;

/**
 * Hashing utilities for passwords and tokens.
 *
 * - `password`: Uses bcrypt (slow & secure for user passwords)
 * - `token`: Uses SHA-256 (fast, one-way for reset/verify tokens)
 */
export const hashUtil = {
	password: {
		async hash(password: string): Promise<string> {
			return bcrypt.hash(password, SALT_ROUNDS);
		},

		async compare(password: string, hashedPassword: string): Promise<boolean> {
			return bcrypt.compare(password, hashedPassword);
		},
	},

	token: {
		hash(token: string): string {
			return crypto.createHash("sha256").update(token).digest("hex");
		},

		compare(token: string, hashedToken: string): boolean {
			const newHash = crypto.createHash("sha256").update(token).digest("hex");
			return newHash === hashedToken;
		},
	},
} as const;

import { FastifyInstance } from "fastify";

import { AccountNotVerifiedError } from "~/errors/domain/AccountNotVerifiedError";
import { AlreadyVerifiedError } from "~/errors/domain/AlreadyVerifiedError";
import { InvalidCredentialsError } from "~/errors/domain/InvalidCredentialsError";
import { BadRequestError } from "~/errors/generic/BadRequestError";
import { ConflictError } from "~/errors/generic/ConflictError";
import { NotFoundError } from "~/errors/generic/NotFoundError";
import { createTokenService } from "~/modules/token/token.services";
import { createVerificationTokensService } from "~/modules/token/verificationToken.services";
import { createUserService } from "~/modules/user/user.services";
import { hashUtil } from "~/utils/hash.util";

import type { LoginRequest } from "./schemas/login.schema";
import { RegisterUserPayload } from "./schemas/registerUser.schema";
import type { ResetPasswordRequest } from "./schemas/resetPassword.schema";

export function createAuthService(app: FastifyInstance) {
	const userService = createUserService(app);
	const verificationTokenService = createVerificationTokensService(app);
	const tokenService = createTokenService(app);

	async function register(payload: RegisterUserPayload) {
		const isUserExisting = await userService.checkUserExistsByEmail(payload.email);

		if (isUserExisting) throw new ConflictError("Email already in use");

		const hashedPassword = await hashUtil.password.hash(payload.password);

		const newUser = await userService.createUser({
			email: payload.email,
			password: hashedPassword,
		});

		const token = await verificationTokenService.createVerificationToken(
			newUser.id,
			"email_verification",
		);

		app.email.send({
			to: newUser.email,
			// TODO environment domain/host, just needs to pass the token
			template: {
				name: "verifyAccountTemplate",
				variables: {
					link: `http://localhost:4321/verify?token=${token}`,
				},
			},
		});

		return { userId: newUser.id, email: newUser.email };
	}

	async function verifyUserAndLogin(token: string) {
		const { user, token: storedHashToken } = await userService.getUserWithValidVerificationToken(
			token,
			"email_verification",
		);

		if (!user) throw new BadRequestError("Invalid verification token.");

		await verificationTokenService.markTokenUsed(storedHashToken.token);
		await userService.verifyUser(user.id);

		const jti = tokenService.generateJti();
		const { role } = await userService.getUserRole(user.id);

		const accessToken = tokenService.issueAccessToken(user.id, role);
		const refreshToken = await tokenService.issueRefreshToken(user.id, jti);

		return { accessToken, refreshToken };
	}

	async function login(payload: LoginRequest) {
		const user = await userService.getUserByEmail(payload.email);

		if (!user) throw new InvalidCredentialsError();

		const isPasswordValid = await hashUtil.password.compare(payload.password, user.password);

		if (!isPasswordValid) throw new InvalidCredentialsError();

		if (!user.isVerified) throw new AccountNotVerifiedError();

		const jti = tokenService.generateJti();
		const userRole = await userService.getUserRole(user.id);

		const accessToken = tokenService.issueAccessToken(user.id, userRole.role);

		const refreshToken = await tokenService.issueRefreshToken(user.id, jti);

		return { accessToken, refreshToken };
	}

	async function refresh(oldRefreshToken: string) {
		const payload = tokenService.verifyRefreshToken(oldRefreshToken);
		const storedToken = await tokenService.getRefreshTokenByJti(payload.jti);

		if (!storedToken || storedToken.revoked)
			throw new InvalidCredentialsError("Token has been revoked or is expired");

		const newJti = tokenService.generateJti();
		const { role } = await userService.getUserRole(storedToken.userId);

		const accessToken = tokenService.issueAccessToken(storedToken.userId, role);

		const refreshToken = await tokenService.issueRefreshToken(storedToken.userId, newJti);

		await tokenService.revokeRefreshToken(oldRefreshToken);

		return { accessToken, refreshToken };
	}

	async function logout(refreshToken: string) {
		if (!refreshToken) {
			return { cleared: false };
		}

		await tokenService.revokeRefreshToken(refreshToken);
		return { cleared: true };
	}

	async function requestResetPassword(email: string) {
		const user = await userService.getUserByEmail(email);

		if (!user.email) {
			// TODO Logger logs error silently
			return;
		}

		const token = await verificationTokenService.createVerificationToken(user.id, "password_reset");

		app.email.send({
			to: user.email,
			template: {
				name: "resetPasswordTemplate",
				variables: {
					email: user.email,
					// TODO environment dynamic domain/host, just needs to pass the token
					// TODO Frontend route should be included here and call this endpoint en route to verify, for now use direct endpoint
					link: `http://localhost:3000/api/auth/reset-password?token=${token}`,
				},
			},
		});
	}

	async function resetPassword(payload: ResetPasswordRequest) {
		const hashedPayloadToken = hashUtil.token.hash(payload.token);

		const user = await userService.getUserWithValidVerificationToken(
			hashedPayloadToken,
			"password_reset",
		);

		if (!user) {
			throw new NotFoundError("Password reset request token not found");
		}

		const isTokenValidOrExists = hashUtil.token.compare(payload.token, user.token.token);

		if (!isTokenValidOrExists) {
			throw new NotFoundError("Password reset request token not found");
		}

		await verificationTokenService.markTokenUsed(hashedPayloadToken);

		const hashedNewPassword = await hashUtil.password.hash(payload.password);

		await userService.updateUserPassword(user.user.id, hashedNewPassword);
	}

	async function resendVerificationLink(email: string) {
		const user = await userService.getUserByEmail(email);

		if (!user) throw new NotFoundError("User not found");

		if (user.isVerified) throw new AlreadyVerifiedError();

		const token = await verificationTokenService.createVerificationToken(
			user.id,
			"email_verification",
		);

		app.email.send({
			to: user.email,
			template: {
				name: "verifyAccountTemplate",
				variables: {
					// TODO environment dynamic domain/host, just needs to pass the token
					// TODO Frontend route should be included here and call this endpoint en route to verify, for now use direct endpoint
					link: `http://localhost:3000/api/auth/verify-account?token=${token}`,
				},
			},
		});
	}

	return {
		resendVerificationLink,
		resetPassword,
		requestResetPassword,
		register,
		verifyUserAndLogin,
		login,
		refresh,
		logout,
	};
}

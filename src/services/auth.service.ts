import { FastifyInstance } from "fastify";
import { AccountNotVerifiedError } from "~/domain/errors/AccountNotVerifiedError";
import { AlreadyExistsError } from "~/domain/errors/AlreadyExistsError";
import { AlreadyVerifiedError } from "~/domain/errors/AlreadyVerifiedError";
import { BadRequestError } from "~/domain/errors/BadRequestError";
import { InvalidCredentialsError } from "~/domain/errors/InvalidCredentialsError";
import { NotFoundError } from "~/domain/errors/NotFoundError";
import { hashUtil } from "~/utils/hash.util";
import { UserCreate, UserUpdatePassword } from "~/validators/user.validator";
import { createTokenService } from "./token.service";
import { createUserService } from "./user.service";
import { createVerificationTokensService } from "./verificationTokens.service";

export function createAuthService(app: FastifyInstance) {
	const userService = createUserService(app);
	const verificationTokenService = createVerificationTokensService(app);
	const tokenService = createTokenService(app);

	async function register(payload: UserCreate) {
		const isUserExisting = await userService.checkUserExistsByEmail(payload.email);

		if (isUserExisting) {
			throw new AlreadyExistsError("Email already in use");
		}

		const hashedPassword = await hashUtil.password.hash(payload.password);

		const newUser = await userService.createUser({
			email: payload.email,
			password: hashedPassword,
		});

		const token = await verificationTokenService.createVerificationToken(
			newUser.id,
			"EMAIL_VERIFICATION",
		);

		app.email.send({
			to: newUser.email,
			template: {
				name: "verifyAccountTemplate",
				variables: {
					// TODO environment domain/host, just needs to pass the token
					link: `http://localhost:3000/api/v1/auth/verify-account?token=${token}`,
				},
			},
		});
	}

	async function verifyUserAndLogin(token: string) {
		const { user, token: storedHashToken } = await userService.getUserWithValidVerificationToken(
			token,
			"EMAIL_VERIFICATION",
		);

		if (!user) {
			throw new BadRequestError("Invalid verification token.");
		}

		await verificationTokenService.markTokenUsed(storedHashToken.token);
		await userService.verifyUser(user.id);

		const jti = tokenService.generateJti();
		const { role, permissions } = await userService.getUserPermission(user.id);

		const accessToken = tokenService.issueAccessToken(user.id, role, permissions);
		const refreshToken = await tokenService.issueRefreshToken(user.id, jti);

		return { accessToken, refreshToken };
	}

	async function login(payload: Omit<UserCreate, "updatedAt">) {
		const user = await userService.getUserByEmail(payload.email);
		const isPasswordValid = await hashUtil.password.compare(payload.password, user.password);

		// TODO frontend needs to know exactly if user is verified, if not verified prompt to send verification email
		if (!user.isVerified) {
			throw new AccountNotVerifiedError();
		}

		if (!user || !isPasswordValid) {
			throw new InvalidCredentialsError();
		}

		const jti = tokenService.generateJti();
		const userPermission = await userService.getUserPermission(user.id);

		const accessToken = tokenService.issueAccessToken(
			user.id,
			userPermission.role,
			userPermission.permissions,
		);

		const refreshToken = await tokenService.issueRefreshToken(user.id, jti);

		return { accessToken, refreshToken };
	}

	async function refresh(oldRefreshToken: string) {
		const payload = tokenService.verifyRefreshToken(oldRefreshToken);
		const storedToken = await tokenService.getRefreshTokenByJti(payload.jti);

		if (!storedToken || storedToken.revoked) {
			throw new InvalidCredentialsError("Token has been revoked or is expired");
		}

		const newJti = tokenService.generateJti();
		const { role, permissions } = await userService.getUserPermission(storedToken.userId);

		const accessToken = tokenService.issueAccessToken(storedToken.userId, role, permissions);
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

		const token = await verificationTokenService.createVerificationToken(user.id, "PASSWORD_RESET");

		app.email.send({
			to: user.email,
			template: {
				name: "resetPasswordTemplate",
				variables: {
					email: user.email,
					// TODO environment dynamic domain/host, just needs to pass the token
					// TODO Frontend route should be included here and call this endpoint en route to verify, for now use direct endpoint
					link: `http://localhost:3000/api/v1/auth/reset-password?token=${token}`,
				},
			},
		});
	}

	async function resetPassword(payload: UserUpdatePassword) {
		const hashedPayloadToken = hashUtil.token.hash(payload.token);

		const user = await userService.getUserWithValidVerificationToken(
			hashedPayloadToken,
			"PASSWORD_RESET",
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

		if (!user) {
			throw new NotFoundError("User not found");
		}

		if (user.isVerified) {
			throw new AlreadyVerifiedError("User is already verified");
		}

		const token = await verificationTokenService.createVerificationToken(
			user.id,
			"EMAIL_VERIFICATION",
		);

		app.email.send({
			to: user.email,
			template: {
				name: "verifyAccountTemplate",
				variables: {
					// TODO environment dynamic domain/host, just needs to pass the token
					// TODO Frontend route should be included here and call this endpoint en route to verify, for now use direct endpoint
					link: `http://localhost:3000/api/v1/auth/verify-account?token=${token}`,
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
